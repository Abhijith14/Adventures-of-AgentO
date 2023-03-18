:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/html_write)).		
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_server)).
:- use_module(library(http/http_server_files)).
:- use_module(library(http/http_client)).
:- use_module(library(http/http_error)).
:- use_module(library(http/http_session)).
:- use_module(library(http/http_authenticate)).
:- use_module(library(http/http_wrapper)).
:- use_module(library(time)).
:- use_module(library(http/http_dirindex)).
:- use_module(library(http/http_files)).


:- dynamic i_am_at/1, at/2, holding/1, locked/2, use/3, start_time/1, checkpoint/1.
:- retractall(at(_, _)), retractall(i_am_at(_)).

checkpoint(0).


% Check if start_time is set
has_start_time :- clause(start_time(_), _).

% This predicate prints the time in mm:ss format
print_time(T) :-
    M is div(T, 60), % Get the minutes
    S is mod(T, 60), % Get the seconds
    format('<div id="currTime" style="display:none;">~d:~d</div>', [M, S]). % Print the time in mm:ss format

reset :-  
    retractall(at(_, _)),
    retractall(i_am_at(_)), 
    retractall(holding(_)), 
    retractall(use(_, _, _)), 

    assert(i_am_at(hall)),
    assert(locked(_,_)),
    assert(at(livingroom_key, kitchen)),
    assert(at(bathroom_key, livingroom)),
    assert(at(bedroom_key, bathroom)),

    assert(use(chest, hall, kitchen_key)).


i_am_at(hall).

path(hall, n, livingroom).
path(hall, e, kitchen).
path(hall, w, bedroom).
path(hall, s, bathroom).

path(livingroom, s, hall).
path(kitchen, w, hall).
path(bedroom, e, hall).
path(bathroom, n, hall).

at(livingroom_key, kitchen).
at(brokenPipe1, kitchen).
at(bathroom_key, livingroom).
at(document, bedroom).
% at(bedroom_key, bathroom).
% at(kitchen_key, hall).

use(exitdoor, kitchen, theend).
use(chest, hall, kitchen_key). % (item_to_use, place, item_to_get)
use(brokenPipe2, bathroom, bedroom_key).

locked(kitchen, kitchen_key).
locked(livingroom, livingroom_key).
locked(bedroom, bedroom_key).
locked(bathroom, bathroom_key).


% describe(Place) :- write('You are at '), write(Place), nl.

/* These rules set up a loop to mention all the objects
   in your vicinity. */

notice_objects_at(Place, Thing) :-
        at(X, Place),
        string_concat(X, "", Thing).

notice_objects_at(_, _).

look(Place, Thing) :-
    i_am_at(CurrPlace),
    string_concat(CurrPlace, "", Place),
    notice_objects_at(CurrPlace, Thing).


/* These rules describe how to pick up an object. */

take(X) :-
    holding(X),
    % write('You''re already holding it!'),
    retract(checkpoint(_)),
    assert(checkpoint(11)),
    !, nl.

take(X) :-
    i_am_at(Place),
    at(X, Place),
    holding(_),
    drop(_),
    retract(at(X, Place)),
    assert(holding(X)).
    %write('Took '), write(X), write(' from '), write(Place),
    %!, nl.


take(X) :-
    i_am_at(Place),
    at(X, Place),
    retract(at(X, Place)),
    assert(holding(X)).
    %write('Took '), write(X), write(' from '), write(Place),
    %!, nl.


take(_).


/* a predicate the interact with the usable objects */
touch(X) :-
    i_am_at(Place),
    use(X, Place, Y),
    retract(use(X, Place, Y)),
    assert(at(Y, Place)).

touch(X) :-
    i_am_at(Place),
    use(X, Place, Y),
    holding(K),
    retract(use(X, Place, Y)),
    retract(holding(K)),
    assert(at(Y, Place)).


touch(_).
    

/* These rules describe how to put down an object. */

drop(X) :-
    holding(X),
    i_am_at(Place),
    retract(holding(X)),
    assert(at(X, Place)).
    %write('Dropped '),write(X),write(' at '),write(Place),
    %!, nl.

drop(_) :-
    % write('You aren''t holding it!'),
    retract(checkpoint(_)),
    assert(checkpoint(12)),
    nl.


/* These rules define the direction letters as calls to go/1. */

n :- go(n).

s :- go(s).

e :- go(e).

w :- go(w).

/* This rule tells how to move in a given direction. */

go(Direction) :-
    i_am_at(Here),
    path(Here, Direction, hall),
    % write(' this is for the hall'),
    retract(i_am_at(Here)),
    assert(i_am_at(hall)).
    %!, look.


go(Direction) :-
    i_am_at(Here),
    path(Here, Direction, There),
    \+locked(There, _),  % not locked, so can go
    % write(' this is for the other rooms'),
    retract(i_am_at(Here)),    
    assert(i_am_at(There)).


go(Direction) :-
    i_am_at(Here),
    path(Here, Direction, There),
    holding(Key),
    locked(There, Key),
    retract(i_am_at(Here)),
    retract(locked(There, Key)),
    assert(i_am_at(There)).
    %!, look.

go(Direction) :-
    i_am_at(Here),
    path(Here, Direction, _),
    % write(There), write(' door is locked!. Get the key first!').
    retract(checkpoint(_)),
    assert(checkpoint(13)).


go(_) :-
    % write('You can''t go that way.').
    retract(checkpoint(_)),
    assert(checkpoint(14)).




start :-
        working_directory(_, 'D:/projects/ass2'),
        http_server(http_dispatch, [port(8000)]).


:- http_handler(root(.), instructions_handler, []).
:- http_handler('/static/', http_reply_from_files('static', []), [prefix]).

instructions_handler(_Request) :-
    read_file_to_codes('html/instructions.html', Codes, []),
    format('Content-type: text/html~n~n'),
    format('~s', [Codes]).

	


:- http_handler(root(game), game_handler, []).


game_handler(Request) :-
    read_file_to_codes('html/main.html', Codes, []),
    format('Content-type: text/html~n~n'),
    format('~s', [Codes]),
    format('<script>var checkpoint;</script>'),

    % manage all the get requests
    (  member(method(get), Request),
       catch(http_parameters(Request, [pick(SelectedItem, [])]), _, fail)
    -> 
        take(SelectedItem)
    ;  member(method(get), Request),
         catch(http_parameters(Request, [drop(DropItem, [])]), _, fail)
    ->
        drop(DropItem)
    ;   member(method(get), Request),
        catch(http_parameters(Request, [direction(Direction, [])]), _, fail)
    ->
        go(Direction)
    ;   member(method(get), Request),
        catch(http_parameters(Request, [useItem(UseItem, [])]), _, fail)
    ->  
        (   UseItem == chest
        ->  
            % set the checkpoint to 1
            retract(checkpoint(_)),
            assert(checkpoint(1)),
            touch(UseItem)
        ;   UseItem == brokenPipe2
        ->  (  holding(brokenPipe1)
            ->  retract(checkpoint(_)),
                assert(checkpoint(8)),
                touch(UseItem)
            ;   %write('You need to pick up the other part of broken pipe first!')
                retract(checkpoint(_)),
                assert(checkpoint(15))
            )
            
        ;   UseItem == exitdoor
        ->  (  holding(document)
            ->  %write('Thank you for playing the game !!'), nl, halt
                retract(checkpoint(_)),
                assert(checkpoint(17))
            ;   %write('You need to find the document first!')
                retract(checkpoint(_)),
                assert(checkpoint(16))
            )
        )
    ;   member(method(get), Request),
        catch(http_parameters(Request, [reset(_, [])]), _, fail)
    ->
        reset
    ; true
    ),

    i_am_at(Place),
    findall(X, at(X, Place), Items),
    % atomic_list_concat(Items, '","', ItemsString),
    %print the location
    format('<script>document.getElementById("location").innerHTML = "You are at ~w.";</script>', [Place]),


    % setting different checkpoints at different locations
    (   Place == kitchen, not(checkpoint(17)), not(checkpoint(16)), not(checkpoint(14)), not(checkpoint(11)), not(checkpoint(12)), not(holding(document))
    ->  retract(checkpoint(_)),
        assert(checkpoint(2))
    ;   
    
        Place == livingroom, not(checkpoint(14)), not(checkpoint(11)), not(checkpoint(12)), not(holding(document))
    ->  retract(checkpoint(_)),
        assert(checkpoint(3))
    ;   
    
        Place == bathroom, not(holding(brokenPipe1)), not(checkpoint(8)), not(checkpoint(14)), not(checkpoint(15)), not(checkpoint(11)), not(checkpoint(12)), not(holding(document))
    ->  retract(checkpoint(_)),
        assert(checkpoint(4))
    ;   
    
        Place == bathroom, holding(brokenPipe1), not(checkpoint(8)), not(checkpoint(14)), not(checkpoint(15)), not(checkpoint(11)), not(checkpoint(12)), not(holding(document))
    -> retract(checkpoint(_)),
        assert(checkpoint(7))
    ;   
    
        Place == bedroom, not(at(document, bedroom)), not(holding(document)), not(checkpoint(14)), not(checkpoint(11)), not(checkpoint(12))
    ->  retract(checkpoint(_)),
        assert(checkpoint(5))
    ;   
        Place == bedroom, at(document, bedroom) , not(checkpoint(14)), not(checkpoint(11)), not(checkpoint(12))
    ->  retract(checkpoint(_)),
        assert(checkpoint(10))
    ;  
        Place == bedroom, holding(document), not(checkpoint(14)), not(checkpoint(11)), not(checkpoint(12))
    ->  retract(checkpoint(_)),
        assert(checkpoint(9))
    ;   
        Place == hall, not(checkpoint(0)), not(checkpoint(1)), not(checkpoint(13))
    -> retract(checkpoint(_)),
        assert(checkpoint(6))
    ; 
        holding(document), not(Place==bedroom), not(Place==hall), not(checkpoint(17)), not(checkpoint(14))
        ->
        retract(checkpoint(_)),
        assert(checkpoint(18))
    ; true
    ),
    

    
    (Items \= []
        ->  forall(member(Item, Items),
                (string_concat(Item, "", ItemString),
                    format('<input style="display:none;" type="radio" name="picktheitem1" id="picktheitem1~w" value="~w"><br>', [ItemString, ItemString])))
        ; true
    ),


    (holding(CurrItem) ->
        format('<button  style="display:none;" id="dropBtn1" name="dropBtn1" value="~w">Drop ~w</button>', [CurrItem, CurrItem])
    ; true
    ),

    % print the items that agent can use in the use predicate
    findall(X, use(X, Place, _), UseItems),
    % atomic_list_concat(UseItems, '","', UseItemsString),

    (UseItems \= []
        ->  forall(member(Item, UseItems),
                (string_concat(Item, "", ItemString),
                      format('<input style="display:none;" type="radio" name="usetheitem1" id="usetheitem1~w" value="~w" onchange="use_the_item(\'~w\');"><br>', [ItemString, ItemString, ItemString])))
        ; true
    ),

    
    % The map
    format('<img  style="display:none;" src="https://raw.githubusercontent.com/Abhijith14/Adventures-of-AgentO/master/images/~w.png" alt="~w" id="mapImage1">', [Place, Place]),
    checkpoint(Checkpoint),
    format('<script>checkpoint = ~w;</script>', [Checkpoint]).
    

:- http_handler(root(theend), end_handler1, []).

end_handler1(_Request) :-
    read_file_to_codes('html/theend.html', Codes, []),
    format('Content-type: text/html~n~n'),
    format('~s', [Codes]).


:- http_handler(root(gameover), end_handler2, []).

end_handler2(_Request) :-
    read_file_to_codes('html/gameover.html', Codes, []),
    format('Content-type: text/html~n~n'),
    format('~s', [Codes]).



% Handle requests for the time remaining
:- http_handler('/gettime', time_remaining_handler, []).

% The game handler
time_remaining_handler(_Request) :-

    format('Content-type: text/plain~n~n'),

    % Set a time limit of 5 minutes
    Limit is 300,

    % If the start time hasn't been set yet, set it now
    (   \+has_start_time
     ->  get_time(Start),
         asserta(start_time(Start))
     ;  start_time(Start)
    ),

    game_loop(Start, Limit, Remaining),
    % print_time(round(Remaining)).

    % if the time remaining is less than 0, then the game is over
    (   Remaining < 0
     ->  format('Game Over')
     ;  print_time(round(Remaining))
    ).

    
% The game loop
game_loop(Start, Limit, Remaining) :-
    % Get the current time
    get_time(Now),
    % Calculate the time remaining
    Remaining is Limit - (Now - Start).

