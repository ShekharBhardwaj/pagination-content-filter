const $studentList = $('.student-list').children();
const $pageDivSelector = $('.page');
const paginationDiv = '<div class="pagination"><ul class="hrefstudent"></ul></div>';
const $paginationList = $('.pagination ul');
const totalStudentShow =  10;
//Appending pagination to Page div
$pageDivSelector.append(paginationDiv);
//console.log($studentList);
let internalIndex = 0;
let studentObjList = [];
//let tempStudentList = [];

$('.initial-list').toggle(false);

while($studentList.length) {
    studentObjList.push($studentList.splice(0,10));
}

console.log(studentObjList.length);

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
	console.log(e.srcElement.id);
	const pagesList = $('.pagination ul').children();
	for(let i = 0; i < pagesList.length; i += 1){
			const id = i+1;
		if('hrefId'+pagesList[i].innerText != e.srcElement.id){
				 $('#page'+id).hide();
				 $('#hrefId'+id).removeClass('active');
		} else {
			console.log('hrefId'+pagesList[i].innerText);
				$('#page'+id).show();
			  $('#hrefId'+id).addClass('active');
		}
	}
});
