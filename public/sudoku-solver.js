const textArea = document.getElementById('text-input');

document.addEventListener('DOMContentLoaded', () => {
  // Load a simple puzzle into the text area
  textArea.value = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
	textBoxChanged()
});

let textBox = document.querySelector('#text-input');
let cells = document.querySelectorAll('.sudoku-input');
let errorBox = document.querySelector('#error-msg');
let solveButton = document.querySelector('#solve-button');
let clearButton = document.querySelector('#clear-button');
let validateRegex = /^[0-9.]*$/;
let textBoxChanged = () => {
	errorBox.innerText = '';
	if(validateRegex.test(textBox.value) === false){
		errorBox.innerText = 'Error: Invalid Characters'
		return
	}

	if(textBox.value.length != 81){
		errorBox.innerText = 'Error: Expected puzzle to be 81 characters long.'
		return
	}

	let textBoxValues = textBox.value.split('');
	textBoxValues.forEach((value, index) => {
		cells[index].value = value
	})
}

let gridChanged = () => {
	let textString = ''
	cells.forEach((cell) => {
		textString += cell.value.toString()
	})
	errorBox.innerText = ''
	if(validateRegex.test(textString) === false){
		errorBox.innerText = 'Error: Invalid Characters'
		return
	}
	if(textString.length != 81){
		errorBox.innerText = 'Error: Expected puzzle to be 81 characters long.'
		return
	}
	textBox.value = textString
}

let canPlace = (board, row, col, value) => {
	let i
	for(i = 0; i < 9; i++){
		if(board[i][col] == value){
			return false
		}
	}

	let j
	for(j=0; j < 9; j++){
		if(board[row][j] == value){
			return false
		}
	}

	let boxTopRow = parseInt(row / 3) * 3     
	let boxLeftColumn = parseInt(col / 3) * 3  

	let k 
	let l 
	for (k = boxTopRow; k < boxTopRow + 3; k++) {
		for(l = boxLeftColumn; l < boxLeftColumn + 3; l++){
			if(board[k][l] == value){
				return false
			}
		}
	}
	return true
}

let solveFromCell = (board, row, col) => {

	console.log('Attempting to solve row ' + (row + 1) + ', column ' + (col+1))
	if(col === 9){
		col = 0
		row ++
	}

	if(row === 9){
		return board
	}

	if(board[row][col] != '.'){
		return solveFromCell(board, row, col + 1)
	}

	let i
	for(i = 1; i < 10; i ++){
		let valueToPlace = i.toString()
		console.log('Trying with ' + valueToPlace)
		if(canPlace(board, row, col, valueToPlace)){
			board[row][col] = valueToPlace
			if(solveFromCell(board, row, col + 1) != false){
				return solveFromCell(board, row, col + 1)
			}else{
				board[row][col] = '.'
			}
		}
	}
	return false
}

let generateBoard = (values) => {
	let board = [[],[],[],[],[],[],[],[],[]]
	let boardRow = -1
	let i
	for(i = 0; i < values.length; i++){
		if(i % 9 === 0){
			boardRow += 1
		}
		board[boardRow].push(values[i])
	}
	return board
}

let solveButtonPressed = () => {
	
	let textBoxValues = textBox.value.split('')
	let originalBoard = generateBoard(textBoxValues)
	let solution = solveFromCell(originalBoard, 0, 0)

	errorBox.innerText = ''
	if(solution === false){
		errorBox.innerText = 'No Solution :('
		return
	}

	let i
	let j
	let solutionString = ''
	for(i = 0; i < solution.length; i++){
		for(j=0; j < solution[i].length; j++){
			solutionString += solution[i][j].toString()
		}
	}

	textBox.value = solutionString
	textBoxChanged()
}

textBox.oninput = textBoxChanged
cells.forEach((cell) => {
	cell.oninput = gridChanged
})
solveButton.onclick = solveButtonPressed
clearButton.onclick = () => {
	textBox.value = ''
	cells.forEach((cell) => {
		cell.value = ''
	})
}


try {
  module.exports = {

  }
} catch (e) {}




