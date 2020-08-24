var title, dom1, dom2, dom3, dom4;

let selectedFile;
console.log(window.XLSX);
document.getElementById('u17_input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
});

var data=[{}];


document.getElementById('u18').addEventListener("click", () => {
    XLSX.utils.json_to_sheet(data, 'out.xlsx');
    if(selectedFile){
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event)=>{
         let data = event.target.result;
         let workbook = XLSX.read(data,{type:"binary"});
            
            
         workbook.SheetNames.forEach(sheet => {
              let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
              console.log(rowObject);
              console.log("--------------");
              document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject,undefined,4)
             data=rowObject;
         });
            console.log("showing data");
            title = (data[0].Title);
            dom1 = data[0].DomainName;
            dom2 = data[1].DomainName;
            dom3 = data[2].DomainName;
            dom4 = data[3].DomainName;
        }
    }
});
