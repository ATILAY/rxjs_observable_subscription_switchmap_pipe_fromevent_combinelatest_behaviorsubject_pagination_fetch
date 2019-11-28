
//rxjs_observable_subscription_switchmap_pipe_fromevent_combinelatest_behaviorsubject_pagination_fetch
////////////////////////
//BENEFICAL SIDES OF ES6
//WE  INCLUDE  RXJS AND RXJS OPERATORS WITH 'CDN'  IN THE HEAD OF INDEX.HTML
// AND WE INCLUDE CODES BELOW TO THE INDEX.HTML BY ADDING THEM TO INSIDE OF THE BODY ELEMENT AFTER ALL HTML ELEMENTS
const { fromEvent, fromPromise, combineLatest, BehaviorSubject } = rxjs;
const { map, filter, switchMap, debounceTime } = rxjs.operators;
const APIKey = 'c951ff1';
//FOR PAGINATION
let page = 1;
let div = document.getElementById('div');
//-----------------------pipe (filter) cevir pipe in icinde tekrar switch map yaparak 
//---------------------------get ile aldıgın datayı dinleyen subscriber ((observer) dondurebilirsin!)

//BehaviorSubject --> Requires an initial value and emits the current value to new subscribers
const pageChanged$ = new BehaviorSubject(page);  

fromEvent(document.getElementById('next-button'), 'click').subscribe(() => {
    //SUBSCRIBE WAITING FOR  ARROW FUNC.
    pageChanged$.next(++pageChanged$.value)
    //LISTEN TO PAGINATION NEXT BUTTON IF CLICKED THEN INCREASE THE PAGE VALUE
})
fromEvent(document.getElementById('prev-button'), 'click').subscribe(() => {
    //SUBSCRIBE WAIT FOR ARROW FUNC
    let pageValue = pageChanged$.value;
    pageChanged$.next(--pageValue < 1 ? 1 : pageValue)
    //WHEN CLICKED  PREV-BUTTON  LETS DECREASE PAGE VALUE AND IF IT IS 1 DONT DECREASE IT ANYMORE
})

function showMovies(items) {
    $('#movies').empty();
    // Remove all child nodes of the set of matched elements from the DOM.
    // This method does not accept any arguments.
    // This method removes not only child (and other descendant) elements,
    //  but also any text within the set of matched elements. 
    // This is because, according to the DOM specification, 
    // any string of text within an element is considered a child node of that element. 
    // Consider the following HTML:

    items.forEach(item => {
        //CREATED IMG ELEMENT
        const add_img = document.createElement("IMG");
        //ADDED SRC ATT. AND ITS VALUE FROM FETCHED API 
        add_img.setAttribute("src", item.Poster);
        const movies_div = document.querySelector('#movies');
        //CREATED ELEMENTS APPENDED INTO THE MOVIES DIV
        movies_div.appendChild(add_img);
    });
}

let input = document.getElementById('txtinput');
// asObservable()
// Creates a new Observable with this Subject as the source.
// You can do this to create customize Observer-side logic of the Subject and conceal it from code that uses the Observable.
//->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>pagination with fetch API &{pageValue}
obsMovieCome$ = (data) => pageChanged$.asObservable().pipe(switchMap(pageValue => fetch(`https://www.omdbapi.com/?apikey=${APIKey}&s=${data}&page=${pageValue}`)))

//WHEN STARTS TYPING  LISTEN THAT WITH FROMEVENT AND USE PIPE OPERATOR
//WAIT BEFORE 0.5 SEC. JUST BEFORE FETVCHING DATA 
//AND WHEN NEW TYPPING START ,STOP TO LISTENING OLD DATA AND AGAING LISTEN NEW COMING DATA BY USING SWITCHMAP
obsWriteDown$ = fromEvent(input, 'keydown').pipe(
    debounceTime(500),
    map(event => event.target.value),
    filter(value => value.length >= 3),
    switchMap(obsMovieCome$),
    switchMap(res => res.json()),
    map(res => {
        const items = res.Search || [];
        //MANUPILATE CSS OF DIV ACCORDING TO ARRAY LENGTH OF COMING DATA ARRAY
        div.style.width = (items.length * 70) + 'px';
        return items;
    })
);
//WHEN THE MOUSE START TO MOVE INSIDE THAT SPECIFIC DIV, START TO LISTEN THAT MOVEMENT WHICH IS THE X AXIS LISTENING
obsMouseMove$ = fromEvent(div, 'mousemove');

//COMBINE THOSE OBSERVABLES AND START LISTENING THEM TOGETHER
combineLatest(
    obsWriteDown$,
    obsMouseMove$
    //SEARCH ARRAY FOR RESULT DATA OF THE API , MOUSEEVENT FOR MOUSE MOVE IN THE SPECIFIC DIV
).subscribe(([search = [], mouseEvent]) => {
    //ROUND ALWAYS UP TO THE FLOATING NUMBERS OF THE MOUSE IN X AXIS 
    let horizontalProgress = Math.ceil(mouseEvent.clientX / 70);
    //SLICE THE COMING DATA ARRAY TO SHOW ACCORDING TO MAX X AXIS PLACE OF THE MOUSE IN THAT SPECIFIC DIVİ
    //AND DECIDE TO SHOW A SPECIFIC AMOUNT OF THE DATA ACCORDING TO MAX X AXIS PLACE OF THE MOUSE
    showMovies(search.slice(0, horizontalProgress))
});