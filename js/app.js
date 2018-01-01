const $studentList = $('.student-list').children();
const $pageDivSelector = $('.page');
const paginationDiv = '<div class="pagination"><ul class="hrefstudent"></ul></div>';
const $paginationList = $('.pagination ul');
const totalStudentShow =  10;
//Appending pagination to Page div
$('.student-list').addClass('initial-list');
$pageDivSelector.append(paginationDiv);
//console.log($studentList);
let internalIndex = 0;
let studentObjList = [];
//let tempStudentList = [];

$('.initial-list').toggle(false);

while($studentList.length) {
    studentObjList.push($studentList.splice(0,10));
}

//Adding search box 
$('.page-header h2').after(`
<div class="student-search">
	<input placeholder="Search for students...">
	<button class="search-button">Search</button>
	</div>`);

for (let i = 0; i < studentObjList.length; i += 1){
			const hrefId = i +1;
			if(hrefId != 1){
				$('<ul class="student-list" id="page'+hrefId+'"></ul>').insertAfter('.page-header');
				for(let j = 0; j < studentObjList[i].length; j +=1){
					$('#page'+hrefId).append(studentObjList[i][j]);
					$('#page'+hrefId).hide();
			}
			} else {
				$('<ul class="student-list" id="page'+hrefId+'"></ul>').insertAfter('.page-header');
				for(let j = 0; j < studentObjList[i].length; j +=1){
						$('#page'+hrefId).append(studentObjList[i][j]);
			}
			}
			if (hrefId != 1) {
			$('.hrefstudent').append('<li><a id="hrefId'+hrefId+'" href="#page'+hrefId+'">'+hrefId+'</a></li>');
			} else {
				$('.hrefstudent').append('<li><a id="hrefId'+hrefId+'" href="#page'+hrefId+'">'+hrefId+'</a></li>');
				$('#hrefId'+hrefId).addClass('active');
			}
}
	
$(".hrefstudent" ).on("click", (e)=>{
	const pagesList = $('.pagination ul').children();
	for(let i = 0; i < pagesList.length; i += 1){
			const id = i+1;
		if('hrefId'+pagesList[i].innerText != e.srcElement.id){
				 $('#page'+id).hide();
				 $('#hrefId'+id).removeClass('active');
		} else {
				$('#page'+id).show();
			  $('#hrefId'+id).addClass('active');
		}
	}
});

$('.search-button').on('click',function(e){
	 let studentSearch = $('.student-search input').val().toLowerCase();
	console.log(studentSearch);
	const searchDiaplayList = [];
	console.log(studentObjList.length);
	const studentDatum = document.getElementsByClassName('student-item');
	for(let i = 0; i < studentDatum.length; i +=1) {
			let datumList = studentDatum[i].innerText
							 .trim()
							 .replace( /\n/g, "" )
							 .trim().split( " " )
							 .filter(String);
						//console.log(datumList);
						console.log((datumList[0].startsWith(studentSearch) 
												 || datumList[1].startsWith(studentSearch)
												 || datumList[2].startsWith(studentSearch)));
//			if(datumList[0].toLowerCase().startsWith(studentSearch, 10)
//				 || datumList[1].toLowerCase().startsWith(studentSearch, 10) 
//				 || datumList[2].toLowerCase().startsWith(studentSearch, 10)){
//					console.log('found');
//				 } else {
//					 console.log('not found');
//				 }
	}
});

