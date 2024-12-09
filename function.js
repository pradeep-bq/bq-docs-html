function showNumber(){
  var thcount=1
  var isfillrate=0
  var allTables = document.getElementsByTagName( 'table'  ).length;
    var allTHs = document.getElementsByTagName( 'th'  );
    for ( var counter = 0; counter < allTHs.length; counter++ ){
      // console.log('colspan::',allTHs[counter].colSpan)
           
      if ((allTHs[counter].innerHTML == 'Count') || (allTHs[counter].innerHTML == 'number of officers')){
        thcount = counter+2    
      }
      if (allTHs[counter].innerHTML == 'Fill Percentage'){
        isfillrate=1;
      }      
    }    
    var allTDs = document.getElementsByTagName( 'td'  );    
    j=1
    for ( var c = 0; c < allTDs.length; c++ )
    {
      j++;
      
      if(j==thcount){
        // console.log(j, thcount)
        allTDs[c].className='numbers';
        if (isfillrate){
          allTDs[c+1].className='numbers';
        }
        
          if (isNumeric(allTDs[c].innerHTML)){  
            var num = allTDs[c].innerHTML                  
            // console.log('inside',num)
            obj1 = new Intl.NumberFormat('en-US');  
            output = obj1.format(num);
            allTDs[ c ].innerHTML = output;
          }else{
            obj1 = new Intl.NumberFormat('en-US');
            var sp = allTDs[c].innerHTML.split(";")
            var ht=''
            // console.log(sp.length)
            if(sp.length > 1){
              for(i=0; i<sp.length; i++){
                sp2 = sp[i].split("=")
                ht += sp2[0]+"="+obj1.format(sp2[1])+'<br/>'
              }
              allTDs[ c ].innerHTML = ht;
            }             
          }
      }
      // console.log('Allth',allTHs.length/allTables)
      if(j==allTHs.length/allTables+1){
        j=1;
      }            
    }
  }
  

  function isNumeric(num){
    return !isNaN(num)
  }

  function showNumberWithDesc(){
    var allTDs = document.getElementsByTagName( "td" );    
    j=1
    for ( var counter = 0; counter < allTDs.length; counter++ )
    {
      j++;
      if(j==6){
        if (allTDs[counter].className =='numbers'){
          var num = allTDs[counter].innerHTML      
          obj1 = new Intl.NumberFormat('en-US');  
          output = obj1.format(num);
          allTDs[ counter ].innerHTML = output;
        }            
      }
      if(j==7){
        j=1;
      }
      
    }
  }

  function displayNumber(){
    var tds = document.getElementsByTagName("td");
    for (var i = 0; i<tds.length; i++) {

      // If it currently has the ColumnHeader class...
      if (tds[i].className == "number") {
        var num = tds[i].innerHTML
        obj1 = new Intl.NumberFormat('en-US');  
        output = obj1.format(num);
        tds[i].innerHTML = output;         
      }
    }
  }