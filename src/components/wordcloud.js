import result from '../img/result.jpg';
import shapes from './shapes.js';
import images from "../img/masks";
import React, { useState } from 'react';
import x from '../img/red-x.svg';
import file from '../img/file.png';
import { TwitterPicker } from 'react-color';
import axios from 'axios';
import { saveAs } from 'file-saver'
import AdSense from 'react-adsense';
import reset from '../img/reset.png';

require('dotenv').config()

export default function WordCloud() {

	const api_url = process.env.REACT_APP_API;
	
	const [maskname, setmask] = useState('box')
	const [customShape, setCustomShape] = useState(null)
	const [text, setText] = useState('enter words here')
	const [background, setBackground] = useState('#000')
	const [foreground, setForeground] = useState('#000')
	const [font, setFont ] = useState('')
	const [fontstyle, setFontStyle ] = useState('normal')
	const [fontsize, setFontSize ] = useState(226)
	const [lang, setLang] = useState('en')
	const [count, setCount] = useState('');
	const [flag, setFlag] = useState();

	const downloadImage = () => {
	setFlag(false);
	setTimeout(() => {
		      const result_img = document.getElementById('result-img')
		      console.log(result_img.src)
         saveAs(result_img.src, 'wordcloud.jpg') // download image.
	},100)
        }
	var userLang = navigator.language || navigator.userLanguage; 

	function selectMask(mask){
		setmask(mask)
	}
	const hiddenFileInput = React.useRef(null);
	const hiddenTextInput = React.useRef(null);
  
      const handleCustomShapeClick = event => {
	      event.preventDefault();
              hiddenFileInput.current.click();
     }; 
      const handleCustomShapeChange = event => {
	      const fileUploaded = event.target.files[0];
	      setCustomShape(fileUploaded)

        };
      const handleTextClick = event => {
	      event.preventDefault();
               hiddenTextInput.current.click();
     }; 
      const handleTextChange = event => {
	      const file= event.target.files[0];
	      const reader = new FileReader()
              reader.onload = async (event) => { 
              const texts = (event.target.result)
	      setText(texts)
	      }
	      
	      reader.readAsText(file);    

        };
     const removeCustomShape =() => {
	     setCustomShape(null)
     }
     const handleText = event => {
	     setText(event.target.value)
     }

     const handleFont = event => {
	     setFont(event.target.value)
     }
     const handleFontStyle = event => {
	     setFontStyle(event.target.value)
     }
     const handleLang = event => {
	     setLang(event.target.value)
     }

     const handleReset = event => {
	     setText('');
	     document.getElementById('text').value = '';
     }
     
     


     const handleGenerate = async (event) => {
	      event.preventDefault();
	      var formData = new FormData();
	      formData.append("shape",maskname)
	      if(customShape){
	      formData.append("customshape",customShape, customShape.name)
	      }
	      else{
	      formData.append("customshape",null)
	      }
	      formData.append("background",background)
	      formData.append("font",font)
	      formData.append("fontstyle",fontstyle)
	      formData.append("fontsize",fontsize)
	      formData.append("lang",lang)
	      formData.append("b_lang",userLang)
	      formData.append("text",text)
	     const config = {
		     headers: {
			     'content-type': 'multipart/form-data'
		     }
	     }
	      axios.post(api_url+'cloud/generate', formData, config)
	      .then( function (response){
		      const result_img = document.getElementById('result-img')
		      const imageurl = api_url  + response["data"]["image"]
		      result_img.src = imageurl
		      
		      setCount(response["data"]["words"])
	      })
	      

     }
    const  handleColorChange = (color) => {
     setBackground(color.hex)
   };
   const handleFontSizeChanged = (event) =>{
	   setFontSize(event.target.value)

   }
    const  exportWordCount = () => {
	setFlag(true);
	setTimeout(() => {
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

        /* create a hidden <a> DOM node and set its download attribute */
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "wordcounts.csv");
        document.body.appendChild(link);
        link.click();
   }, 100);
}
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-7">
			<div className="options">
				<form>
					<div className="row">
						<div className="col">
					        <div className="label">Shape </div>  
					
						<div className="shapes">
							{
								shapes.map((mask =>
       					        <span key={mask.id} className= 
						       { maskname === mask.mask ?  'shapebox selectedBox' : 'shapebox' }
						         onClick={() => {
                                                         selectMask(mask.mask)
                                                        }}
						       >
					                <img key= {mask.id} src={images[mask.image]["default"]} width="20" alt={mask.mask} />
							</span>
                                                        ))  }

							<div className="upload-sec">
								 <button onClick={handleCustomShapeClick} className="default-btn">
                                                                  Upload custom shape
                                                                 </button>
						<input type="file" id="upload-shape" name="customshape" accept="image/x-png,image/jpeg"
						 ref={hiddenFileInput}
                                                 onChange={handleCustomShapeChange}
                                                 style={{display:'none'}} 
						/>
						{ customShape ? (
						<span> {customShape.name}<img class="x" src={x} onClick={removeCustomShape} /> </span>
						): <span></span>
						}
							</div>
						</div>
						</div>
						<div className="col">
						<div>
						<div className="background">
					        <div className="label">Foreground</div>
						<TwitterPicker color={background} onChangeComplete={handleColorChange } /> 
						</div>
						<div className="background">
					        <div className="label">Background</div>
						<TwitterPicker color={background} onChangeComplete={handleColorChange } /> 
						</div>
						</div>
						</div>
						
						
					</div>
					
					<div className="textArea">
                                             <div className="row">
						     <div className="col">
						
						<div className="font inline">
							<div>
					        <div className="label">Font</div>
							<select className="font-select" onChange={handleFont}>
								<option selected value="roboto">Roboto</option>
								<option value="kr">Helvetica</option>
								<option value="jp">Baskerville</option>
								<option value="jp">Times</option>
								<option value="jp">Gotham</option>
							</select>
							</div>
							<div>
						 <div className="label">Style</div>
							<select className="font-select" onChange={handleFontStyle}>
								<option value="jp">Normal</option>
								<option selected value="roboto">Bold</option>
								<option value="kr">Italic</option>
							</select>
							</div>
							<div>
						 <div className="label">Size</div>
								<div class="range-container">
									<input type="range" name="font_size" value={fontsize} id="range" min="0" max="500"
									onChange={handleFontSizeChanged} />
									<label for="range">{fontsize}</label>
								</div>
							</div>
						</div>
					</div>
					
					<div className="col">
                                                <div className="upload-text">
						
								 <button onClick={handleTextClick} className="text-upload-btn">
                                                                  <img className="file-img" src={file} /><span>Upload text file</span>
                                                                 </button>
						<input type="file" id="upload-text" name="customshape" accept="text/plain"
						 ref={hiddenTextInput}
                                                 onChange={handleTextChange}
                                                 style={{display:'none'}} 
						/>
						<select className="lang-select" onChange={handleLang}>
								<option selected value="en">English (en)</option>
								<option value="ko">Korean (ko)</option>
								<option value="cn">Cinease (cn)</option>
								<option value="ja">Japanease (ja) </option>
								
		                                               <option value="ar">Arabic (ar)</option>

	                                                       <option value="hi">Hindi (hi)</option>
	
							</select>
							</div>
						</div>
						</div>
						<textarea id="text" rows="10" cols="50" name='text'
                                                 onChange={handleText} placeholder="Enter words here..."
						   ></textarea>
						   <div className="reset">
						   <img src={reset} height="30px" width="30px"  onClick={handleReset} />
						   </div>
						<div class="generate"> 
                                              	<button onClick={handleGenerate} className="default-btn">
						Generate Cloud
					        </button>
					        </div>
						<AdSense.Google
						client='ca-pub-2864345224210988'
						slot='7806394673'
						style={{ display: 'block' }}
						format='auto'
						responsive='true'
						/>
						
					</div>
				</form>
				

			</div>
			</div>
			<div className="col-md-5">
				<AdSense.Google
                               client='ca-pub-2864345224210988'
                                slot='7806394673'
                                    />

			<div className="result">
				<div class = "btn-group">
					<button className="tab-btn" onClick={() => {setFlag(false);}}> Wordcloud</button>
					<button className = "tab-btn" onClick={() => {setFlag(true);}}> WordList </button>
                                 	<button  onClick={downloadImage} className="default-btn">
						Downlaod Image
					</button>
					<button onClick={exportWordCount} className="default-btn">
						Download WordCount
					</button>
					</div>
                         {flag ? <>
				  { count.length > 1 ?  <>
		          <div className="table-responsive">
                          <table id="table-id" className="table table-striped js-sort-table crypt-table-market-cap">
					<thead>
						<tr>
							<th class="js-sort-number">Words</th>
							<th class="pr-3"> Counts</th>
						</tr>
					</thead>
					<tbody id="tbody">	
					

			               {                            				
				       Object.entries(count).map(([key,value])=>{
                                  return (
				       <tr key={key}>
						<td>{key}</td>
						<td>{value.toString()}</td>
					</tr>
				       );
				  }
				  )}
					</tbody>
				</table>
				</div>
				</> : <>
				<p> </p>
				</>
				}
			  </> : <> 
		          <img src={result} className="result-img" id="result-img" alt="cloud" />
		              </>
	             }
			</div>
		</div>
		</div>
		</div>
	);
}
