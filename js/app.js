//get all the students in a list
const $studentList = $('.student-list').children();
const $pageDivSelector = $('.page');
const paginationDiv = '<div class="pagination"><ul class="hrefstudent"></ul></div>';
const $paginationList = $('.pagination ul');
const totalStudentShow =  10;

// add new classes to control elements better and specifically traget them
$('.student-list').addClass('initial-list');
$('.page').addClass('all-available');
$('body').addClass('init-body-class');

//Add div for pagination tabs
$pageDivSelector.append(paginationDiv);

// init the list of lists for pagination
let studentObjList = [];

// hide the initial list so that it can be reacreated with pagination
$('.initial-list').toggle(false);

/***
  divide list and store them into list of lists and return it
**/
function listDivision(studentListArg, studentObjListArg) {
	while(studentListArg.length) {
    studentObjListArg.push(studentListArg.splice(0,10));
}
	return studentObjListArg;
}

// function call to divide lis
listDivision($studentList, studentObjList);

// function to add the search box html
addSearchBox = () =>{
$('.page-header h2').after(`
<div class="student-search">
	<input placeholder="Search for students...">
	<button class="search-button">Search</button>
	</div>`);
}

//search box function called
addSearchBox();


// function to setup student lists as html element
function setUpStudentList(studentObjListArg, isHide, hrefId, klass) {
	$('<ul class="student-list '+klass+'" id="page'+hrefId+'"></ul>').insertAfter('.page-header');
						for(let j = 0; j < studentObjListArg.length; j +=1){
							$('#page'+hrefId).append(studentObjListArg[j]);
							if(isHide){$('#page'+hrefId).hide();}
		}
}

// function to setup pagination tabs
function setUpPageTabs(hrefId, isactive, klass) {
	$('.hrefstudent').append('<li><a class="'+klass+'" id="hrefId'+hrefId+'" href="#page'+hrefId+'">'+hrefId+'</a></li>');
	if(isactive){$('#hrefId'+hrefId).addClass('active');}
}


// function to setup the custom page element
function setUpPage(studentObjList, klass){
		for (let i = 0; i < studentObjList.length; i += 1){
			const hrefId = i +1;
					if(hrefId != 1){
						  setUpStudentList(studentObjList[i], true, hrefId, klass);
						} else {
						  setUpStudentList(studentObjList[i], false, hrefId, klass);
					}
					if (hrefId != 1) {
							setUpPageTabs(hrefId, false, klass);
					} else {
							setUpPageTabs(hrefId, true, klass);
					}
					
		}
}

// assert if the input value matches
function doesStartsWith(studentDatum, tag, searchWords){
	
	if( typeof(studentDatum.getElementsByTagName(tag)[0]) == 'undefined') {
		 return  false;
	}
	
	return studentDatum.getElementsByTagName(tag)[0].innerHTML.startsWith(searchWords);
	
}

// function to assert the matching criterian and returns boolean
function isSearchMatches(studentDatum, tag1, tag2, searchWords){
	isMatches = false;
	if (doesStartsWith(studentDatum, tag1, searchWords) || doesStartsWith(studentDatum, tag2, searchWords)){
			isMatches = true;
		}
	return isMatches;
}

// function to control properties of pagination tab
function isShowAndActiveTab(id, arg){
	if (arg) {
				$('#page'+id).show();
			  $('#hrefId'+id).addClass('active');
			} else {
				$('#page'+id).hide();
				 $('#hrefId'+id).removeClass('active');
			}
}

// setup page function call
setUpPage(studentObjList, 'init-js-tab');


// event listener for pagination tab clicked
$(".hrefstudent" ).on("click", (e)=>{
	if(e.target.className != 'search-js-tab'){
	const pagesList = $('.pagination ul').children();
	for(let i = 0; i < pagesList.length; i += 1){
			const id = i+1;
		if('hrefId'+pagesList[i].innerText != e.srcElement.id){
				isShowAndActiveTab(id, false);
		} else {
				isShowAndActiveTab(id, true);
		}
		
	}
}});


// event listener for search button
$('.search-button').on('click',function(e){
	$('.not-found').remove();
	let studentSearch = $('.student-search input').val().toLowerCase();
	$('.search-js-tab').remove();
	setUpPage(studentObjList, 'init-js-tab');
	if(studentSearch.length > 0){
		const searchDiaplayList = [];
		const searchDiaplayListObj = [];
		const studentDatum = document.getElementsByClassName('student-item');
		$('.js-list').remove();
		for(let i = 0; i < studentDatum.length; i += 1){
				if(isSearchMatches(studentDatum[i], 'H3', 'span', studentSearch)){
						searchDiaplayList.push(studentDatum[i]);
				}
		}
		  if(searchDiaplayList.length == 0){
				  $('.page-header').after(`    
			<ul class="student-list"><li class="student-item cf not-found">
            <div class="student-details">
                <h3>There are no matches!</h3>
            </div>
        </li></ul>`);
				 }
			 else{
				 setUpPage(listDivision(searchDiaplayList, searchDiaplayListObj), 'search-js-tab');
			 }
			 $('.init-js-tab').remove();
} else {
	location.reload();
}
});

