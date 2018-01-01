const $studentList = $('.student-list').children();
const $pageDivSelector = $('.page');
const paginationDiv = '<div class="pagination"><ul class="hrefstudent"></ul></div>';
const $paginationList = $('.pagination ul');

//Appending pagination to Page div
$pageDivSelector.append($(paginationDiv));
//console.log($studentList.length);
let internalIndex = 0;
let temp  = 0;

for(let index = 0; index <=  $studentList.length; index += 1){
	if (internalIndex != 10) {
			internalIndex += 1;
			}
	else if (internalIndex == 10) {
						$('.hrefstudent').append('<li><a href="#">'+(temp += 1)+'</a></li>');
						internalIndex = 0;
						//console.log('Button '+ (temp += 1));
	} else if (($studentList - index) < 10) {
						 $$('.hrefstudent').append('<li><a href="#">'+(temp += 1)+'</a></li>');
						 //console.log('Button '+ (temp += 1));
						 }
	
}