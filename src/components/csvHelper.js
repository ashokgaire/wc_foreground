
export default function exportWordCount() {
	var table = document.getElementById("tbody");

	//Declaring array variable
	var rows = [["Words","Count"]];

	for(var i =0, row; row = table.rows[i]; i++){
		var column = [];
		
		for (var j= 0; j < row.cells.length; j++)
		{
			
			const col = row.cells[j].innerText.replace(/,/g,"");
			column.push(col);
			
		}
		rows.push(column);
	}

	 var csvContent = "data:text/csv;charset=utf-8,";
         /* add the column delimiter as comma(,) and each row splitted by new line character (\n) */
        rows.forEach(function(rowArray){
            row = rowArray.join(",");
            csvContent += row + "\r\n";
        });
	console.log(rows);

        /* create a hidden <a> DOM node and set its download attribute */
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "wordcounts.csv");
        document.body.appendChild(link);
        link.click();
}