// Function to handle cell clicks/reveals
// Handle '0' containing cells and clears all of them via recursion
function renderCellContent (i, j) {
    if(boardArr[i] && boardArr[i][j] && boardArr[i][j].isFlipped === false) {
        boardArr[i][j].isFlipped = true; 
        document.getElementById(`c${j}r${i}`).style.backgroundColor = "burlywood";
        if (boardArr[i][j].hasBomb === true) {
            document.getElementById(`c${j}r${i}`).innerText = "💣";
        } 
        if (boardArr[i][j].numOfNearBombs === 0) {
            document.getElementById(`c${j}r${i}`).innerText = "";
        renderCellContent(i-1, j-1)
        renderCellContent(i, j-1)
        renderCellContent(i+1, j-1)
        renderCellContent(i-1, j)
        renderCellContent(i+1, j)
        renderCellContent(i-1, j+1)
        renderCellContent(i, j+1)
        renderCellContent(i+1, j+1)
        } 
        else {
            document.getElementById(`c${j}r${i}`).innerHTML = `<strong>${boardArr[i][j].numOfNearBombs}</strong>`;
        }
    } else return
  }




// Flood Fill Algorithm implementation
function floodFillAll (i,j) {
	if (firstClick === true){
		clearAbove(i,j)
		clearBelow(i,j)
		clearRight(i,j)
		clearLeft(i,j)
		clearTopLeft(i,j)
		clearTopRight(i,j)
		clearBottomLeft(i,j)
		clearBottomRight(i,j)
		firstClick = false; 
	}
	if(boardArr[i] && boardArr[i][j]) {
		if (boardArr[i][j].isFlipped === false && boardArr[i][j].numOfNearBombs){
			clearAbove(i,j)
			clearBelow(i,j)
			clearRight(i,j)
			clearLeft(i,j)
			clearTopLeft(i,j)
			clearTopRight(i,j)
			clearBottomLeft(i,j)
			clearBottomRight(i,j)
		}
	}  
}

function clearAbove(i, j) {                                                                   /* Edge Cases*/
	if (boardArr[i] && boardArr[i][j-1] && boardArr[i][j-1].isFlipped === false) {		/* if cell is on top row */	
		if (boardArr[i][j-1].hasBomb === false) {
			renderCellContent(i, j-1)	
			floodFillAll (i,j-1)			
		}
	}  
}

function clearBelow(i, j) {
	if (boardArr[i] && boardArr[i][j+1] && boardArr[i][j+1].isFlipped === false) {		/* if cell is on bottom row */
		if (boardArr[i][j+1].hasBomb === false) {
			renderCellContent(i, j+1)	
			floodFillAll (i,j+1)				
		}
	}   
}

function clearTopRight(i, j) {
	if (boardArr[i+1] && boardArr[i+1][j-1] && boardArr[i+1][j-1].isFlipped === false) {		/* if cell is on top right */
		if (boardArr[i+1][j-1].hasBomb === false) {
			renderCellContent(i+1, j-1)	
			floodFillAll (i+1,j-1)				
		}
	}   
}
function clearTopLeft(i, j) {
	if (boardArr[i-1] && boardArr[i-1][j-1] && boardArr[i-1][j-1].isFlipped === false) {		/* if cell is on top left */
		if (boardArr[i-1][j-1].hasBomb === false) {
			renderCellContent(i-1, j-1)
			floodFillAll (i-1,j-1)					
		}
	}   
}
function clearBottomRight(i, j) {
	if (boardArr[i+1] && boardArr[i+1][j+1] && boardArr[i+1][j+1].isFlipped === false) {		/* if cell is on bottom right */
		if (boardArr[i+1][j+1].hasBomb === false) {
			renderCellContent(i+1, j+1)
			floodFillAll (i+1,j+1)					
		}
	}   
}
function clearBottomLeft(i, j) {
	if (boardArr[i-1] && boardArr[i-1][j+1] && boardArr[i-1][j+1].isFlipped === false) {		/* if cell is on bottom left */
		if (boardArr[i-1][j+1].hasBomb === false) {
			renderCellContent(i-1, j+1)
			floodFillAll (i-1,j+1)					
		}
	}   
}

function clearRight(i, j) {
	if (boardArr[i+1] && boardArr[i+1][j] && boardArr[i+1][j].isFlipped === false) {		/* if cell is not on right */
		if (boardArr[i+1][j].hasBomb === false) {
			renderCellContent(i + 1, j)	
			floodFillAll (i + 1,j)				
		}	
	}
	  
}

function clearLeft(i, j) {
	if (boardArr[i-1] && boardArr[i-1][j] && boardArr[i-1][j].isFlipped === false) { 		/* if the cell is not on left */
        if (boardArr[i-1][j].hasBomb === false) {
            renderCellContent(i - 1, j)		
            floodFillAll (i - 1,j)		
            }	
    }
}