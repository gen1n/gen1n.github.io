javascript: void($(document).ready(function() {
    var dataToggle = $("div[data-label='connector-data-toggle'] input").attr('checked');
    if (typeof dataToggle !== typeof undefined && dataToggle !== false) {
        var colNames = [];
        var container;
        var rows;
        var start;
        var columnName;
        var thisID;
        var sheetID;
        var worksheetNum = 1;
        var oldLabel = '';
        var panelCount;
        var query;
        var queryString;
        var rowTotal;
        var currentRow;
        var lastRowDetect = false;
        var firstRowDetect = true;
        var filterQueryString;
        var currentPage = 1;
        var pageChange = false;
        var start = 1;
        var nextSet;
        var hideButtons;
        var prevSet;
        var sheetLabel;
        var groupLabel;
        var linkedRowID = sessionStorage.getItem('rowid');
        var tempURL = sessionStorage.getItem('tempURL');
        var pageIndex = sessionStorage.getItem('pageIndex');
        var searchQuery = sessionStorage.getItem('searchQuery');
        sessionStorage.removeItem("searchQuery");
        var sheetRow;
        var sheetID = $("div[data-label='global-sheets-id'] input").val();
        sheetID = sheetID.substring(sheetID.indexOf('/d/') + 3, sheetID.indexOf('/edit'));
        var popCount = [];
        var nextButton =  $('div[data-label="connector-next"]');
        var prevButton =  $('div[data-label="connector-previous"]');
        var resultsBox = $('div[data-label="connector-results"]');
        var counterBox = $('div[data-label*="connector-counter');
        nextButton.hide();
        prevButton.hide();
        nextButton.css('cursor','pointer');
        prevButton.addClass('disabled');
        prevButton.find('div').addClass('disabled');
        prevButton.attr('disabled','disabled');

        var filterButton =  $('div[data-label*="connector-filter"]');
        filterButton.css('cursor','pointer');


        if (linkedRowID != null) {
            var sheetRow = sessionStorage.getItem('rowid');
            sessionStorage.removeItem("rowid");
        } else {
            var sheetRow = 1;
        };



        loadSheets();




         nextButton.removeClass('disabled');        
                nextButton.find('div').removeClass('disabled');     
                nextButton.attr('disabled','');     
                nextButton.css('cursor','pointer');     
                  prevButton.addClass('disabled');      
            prevButton.find('div').addClass('disabled');        
            prevButton.attr('disabled','disabled');

        filterButton.click(function() {
       
currentPage = 1;
nextButton.removeClass('disabled');        
                nextButton.find('div').removeClass('disabled');     
                nextButton.attr('disabled','');     
                nextButton.css('cursor','pointer');     
                  prevButton.addClass('disabled');      
            prevButton.find('div').addClass('disabled');        
            prevButton.attr('disabled','disabled');
          filterLabel = $(this).attr('data-label');

          var filterData = filterLabel.split(',');
          $.each(filterData, function(index, value) {
            if (value.indexOf("query=") >= 0) {

             var filterQuery = value.toString().split('=')[1];

             if (filterQuery.indexOf(" equals ") >= 0) {
                filterQuery = filterQuery.replace(" equals ", "=");
            }

            if (filterQuery != "all") {
                filterQuery = encodeURIComponent(filterQuery); 
                filterQueryString = "&sq=" + filterQuery;
            }

            else {
                filterQueryString='';
            }


        } 
    });
          

          sheetRow = 1;

          loadSheets();
           panelCount = $('.ax_default[data-label*="connector-panel"]').length;
   
            totalPages = rowTotal / panelCount;

            totalPages = Math.ceil(totalPages);
            counterString = $(counterBox).text();
           $(counterBox).text('Page 1 of '+totalPages);
            $(resultsBox).text($(resultsBox).text().replace("#", rowTotal));
  
      });

        prevButton.click(function() {
          lastRowDetect = false;
          if (firstRowDetect == false) {
            nextButton.removeClass('disabled');
            nextButton.find('div').removeClass('disabled');
            nextButton.attr('disabled','');
            nextButton.css('cursor','pointer');
            panelCount =   $('.ax_default[data-label*="connector-panel"]').length;
            sheetRowTemp = sheetRow - (panelCount*2);
            sheetRow = sheetRowTemp;

           var rowNums = $('p[data-rownum').map(function() {
                return $(this).data('rownum');
            }).get();

               lowest = Math.min.apply(Math, rowNums);
               highest = Math.max.apply(Math, rowNums);
             difference = highest - (lowest -1);
             prevSet = lowest - difference;  
               if (sheetRow > 1) {
            currentPage = currentPage - 1;
             $(counterBox).text('Page '+currentPage+ ' of '+totalPages);
}          
            if (sheetRow == 1) {
                firstRowDetect = true;
                $(this).addClass('disabled');
                $(this).find('div').addClass('disabled');
                $(this).attr('disabled','disabled');
                $(this).css('cursor','default');
                    currentPage = currentPage - 1;
             $(counterBox).text('Page 1 of '+totalPages);
                

            }
            loadSheets();
         
             prevSet = null;
        }

         totalPages = rowTotal / panelCount;
               totalPages = Math.ceil(totalPages);
              
    });

        nextButton.click(function() {
            pageChange = true;
             
            oldTotal = rowTotal;

            firstRowDetect = false;
            if(lastRowDetect == false) {
               prevButton.removeClass('disabled');
               prevButton.find('div').removeClass('disabled');
               prevButton.attr('disabled','');
               prevButton.css('cursor','pointer');

               panelCount = $('.ax_default[data-label*="connector-panel"]').length;
               var rowNums = $('p[data-rownum').map(function() {
                return $(this).data('rownum');
            }).get();

               highest = Math.max.apply(Math, rowNums);
               nextSet = highest + 1;


               loadSheets();


               if (currentRow == rowTotal || oldTotal != rowTotal || currentRow > rowTotal) {

                 nextButton.addClass('disabled');
                 nextButton.find('div').addClass('disabled');
                 nextButton.attr('disabled','disabled');
                 nextButton.css('cursor','default');
                 lastRowDetect = true;
                   currentPage = currentPage + 1;
             $(counterBox).text('Page '+currentPage+ ' of '+totalPages);
                 preventDefault();


             }
             nextSet = null;
             totalPages = rowTotal / panelCount;
            totalPages = Math.ceil(totalPages);
            counterString = $(counterBox).text();
            currentPage = currentPage + 1;
             $(counterBox).text('Page '+currentPage+ ' of '+totalPages);


         }
            
     });



        function loadSheets() {
            $('.ax_default[data-label*="connector-search"]').each(function() {
               sheetLabel = $(this).attr('data-label');



               var searchInput = $(this).find('input');

               var sheetData = sheetLabel.split(',');

               $.each(sheetData, function(index, value) {
                  if (value.indexOf("worksheet=") >= 0) {
                    worksheetNum = value.toString().split('=')[1];
                } else {
                    worksheetNum = 1;
                }

            });




               $('*[data-label="search-submit-button"]').bind('mousedown', function() {

                   searchTerm = searchInput.val();

                   searchQuery =  encodeURIComponent(searchTerm);
                   searchQuery = '&q='+searchQuery;

                   sessionStorage.worksheetNum = worksheetNum;
                   sessionStorage.searchQuery = searchQuery;

               });



           });

            $('.ax_dynamic_panel[data-label*="connector-panel"],.ax_default[data-label*="connector-panel"]').each(function() {

                $(this).addClass('gs');
                sheetLabel = $(this).parent('.ax_default[data-label*="connector-group"]').attr('data-label');
                if (sheetLabel == undefined) {
                    sheetLabel = $(this).attr('data-label');
                }
                var sheetData = sheetLabel.split(',');
                $.each(sheetData, function(index, value) {
                    if (value.indexOf("row=") >= 0) {
                        start = value.toString().split('=')[1];
                        sheetRow = (parseInt(start));
                    }
                    if (value.indexOf("worksheet=") >= 0) {
                        worksheetNum = value.toString().split('=')[1];
                    } else {
                        worksheetNum = 1;
                    }
                    
                    if (filterQueryString  != undefined) {
                        queryString = filterQueryString;

                    }
                    else {

                        if (value.indexOf("query=") >= 0) {

                            query = value.toString().split('=')[1];
                            if (query.indexOf(" equals ") >= 0) {
                                query = query.replace(" equals ", "=");
                            }
                            query = encodeURIComponent(query);
                            queryString = "&sq=" + query;
                        } else {
                            queryString = '';
                        }

                        if (searchQuery != null) {
                            queryString = searchQuery;

                        }
                    }
                });
                if (oldLabel != sheetLabel || oldLabel == '') {
                    sheetRow = 1;
                }


                $(this).find('div[data-label*="col="],div[data-label*="column="').each(function() {
                    $(this).html('');
                    var colName = $(this).attr('data-label');
                    var colName = colName.toString().split('=')[1];
                    var rows = 0;
                    thisID = $(this).attr('id');
                    if (tempURL != null) {
                        var url = tempURL;
                        sessionStorage.removeItem("tempURL");
                    } else {
                        var url = "https://spreadsheets.google.com/feeds/list/" + sheetID + "/" + worksheetNum + "/public/values?alt=json&max-results=1&start-index=" + sheetRow + queryString;


                    }

                    parseSheetPanel(url, ('#' + thisID), colName, rows, sheetRow, queryString);
                });

                  
                
                    

                sheetRow = parseInt(sheetRow) + 1;
                currentRow = sheetRow - 1;

              


                
                


                sessionStorage.startRow = parseInt(sheetRow) + 2;
                oldLabel = sheetLabel;
            });
 
                  
   
                        

                
                $('div[data-label*="column="]').not($('div[data-label*="connector-panel"] div[data-label*="column="]')).each(function() {
                sheetLabel = $(this).parent('.ax_default[data-label*="connector-group"]').attr('data-label');

                if (sheetLabel == undefined) {
                    sheetLabel = $(this).attr('data-label');
           
                }
               colLabel = $(this).attr('data-label');
              if (colLabel.indexOf(",") >= 0) {
                 $.each(colLabel, function(index, value) {
                    if (value.indexOf("column=") >= 0) {
columnName = value.toString().split('=')[1];
}       
                     });        
            
                }       
            
                else {      
                    columnName = colLabel.split('=')[1];        
                }


                sheetData = sheetLabel.split(',');
                $.each(sheetData, function(index, value) {
                    if (value.indexOf("rows=") >= 0) {
                        rows = value.toString().split('=')[1];
                       

                    }

            
                        if (value.indexOf("column=") >= 0 || value.indexOf("col=") >= 0) {        
                            columnName = value.toString().split('=')[1];        
                        }

                if (prevSet != null) {
                        start = prevSet;
                    }

                    if (nextSet != null) {
                        start = nextSet;


                    }
                  
                if (value.indexOf("worksheet=") >= 0) {
                    worksheetNum = value.toString().split('=')[1];

                }

          
             



                if (value.indexOf("query=") >= 0) {
                    query = value.toString().split('=')[1];
                    if (query.indexOf(" equals ") >= 0) {
                        query = query.replace(" equals ", "=");
                    }
                    query = encodeURIComponent(query);
                    queryString = "&sq=" + query;
                } else {
                    queryString = '';
                }
            });
                if (sheetLabel.indexOf("rows=all") >= 0) {
                    var rows = 9999;
                }
                if (sheetLabel.indexOf("rows") <= 0) {
                    var rows = $(this).find('p').length;
                    
                }
                $(this).find('.text').html('');
                if (tempURL != null) {
                    var url = tempURL;
                    sessionStorage.removeItem("tempURL");
                } else {
                    var url = 'https://spreadsheets.google.com/feeds/list/' + sheetID + '/' + worksheetNum + '/public/values?alt=json&max-results='+rows+'&start-index=' + start + queryString;

                }

                parseSheet(url, $(this).find('.text'), columnName, start, rows, sheetRow, queryString);


            });


            sessionStorage.startRow = parseInt(sheetRow) + 2;
            oldLabel = sheetLabel;
                  

        }

        var w;
        var i = 1;

        function parseSheet(url, container, columnName, start, rows, sheetRow, queryString) {
                nextButton.show();
                prevButton.show();
            $.getJSON(url, function(data) {
                var entry = data.feed.entry;
                rowTotal = data.feed.openSearch$totalResults.$t;
                var end = parseInt(start, 10) + parseInt(rows, 10);
                for (var i = 0; i < end; i++) {
                    var gsxString = eval('data.feed.entry[' + i + '].gsx$' + columnName + '.$t');
                    if (gsxString.match(/(.jpg|.png|.gif)/)) {
                        h = $(container).height();
                        gsxString = '<img data-rownum="' + (start + i) + '" src="' + gsxString + '" height="' + h + '">';
                    }
                    $(container).append('<p data-rownum="' + (start + i) + '" query="' + queryString + '" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + gsxString + '</p>');


                    $("*[data-rownum]").bind("mousedown", function() {
                        url = 'https://spreadsheets.google.com/feeds/list/' + sheetID + '/'+worksheetNum+'/public/values?alt=json&max-results='+rows+'&start-index=' + $(this).attr('data-rownum') + $(this).attr('query');
                        sessionStorage.tempURL = url;
                        sessionStorage.rowid = $(this).attr('data-rownum');
                    });
                    $("*[data-rownum]").bind({
                        'touchstart': function() {
                            sessionStorage.tempURL = url + '&start-index=' + $(this).attr('data-rownum') + '&query=' + $(this).attr('query');
                            sessionStorage.rowid = $(this).attr('data-rownum');
                        }
                    });
                    sheetRow = parseInt(sheetRow) + 1;
                };
                var thisText = $(container).html();
                if (thisText.indexOf("&nbsp;") != -1) {
                    newText = thisText.replace("&nbsp;", "");
                    $(container).html(newText);
                }
            });

        }
        var loaded = false;

        function parseSheetPanel(url, container, columnName, rows, sheetRow, queryString) {
        $(container).closest($('div[data-label*="connector-panel')).show();
            var columnName = columnName.replace(/_/g, '');
            var columnName = columnName.replace(/ /g, '');
            $.getJSON(url, function(data) {
                var entry = data.feed.entry;

                if (entry == undefined){
                    $(container).closest($('div[data-label*="connector-panel')).hide();
                }
            rowTotal = data.feed.openSearch$totalResults.$t;
            
           
            $(resultsBox).text($(resultsBox).text().replace("#", rowTotal));

            panelCount = $('div[data-label*="connector-panel').length;

            if (rowTotal > panelCount){
                nextButton.show();
                prevButton.show();
            }
            if (pageChange == false) {

            totalPages = rowTotal / panelCount;
            totalPages = Math.ceil(totalPages);

            if (totalPages < 1) {
                $(counterBox).text('');
            }

            else {
             $(counterBox).text('Page 1 of '+totalPages);
            }
            }

       
                for (var i = 0; i < 1; i++) {

                    var gsxString = eval('data.feed.entry[' + i + '].gsx$' + columnName + '.$t');

                    if (gsxString.match(/(.jpg|.png|.gif)/)) {
                        h = $(container).height();
                        gsxString = '<img src="' + gsxString + '" height="' + h + '">';
                    }
                    $(container).parent().addClass('populated');
                    $(container).append('<p linkid="' + linkedRowID + '" data-rownum="' + (sheetRow) + '" query="' + queryString + '" style="overflow:hidden;">' + gsxString + '</p>');
                    $(container).closest('.gs').show();
                    $("*[data-rownum]").bind("mousedown", function() {
                        url = 'https://spreadsheets.google.com/feeds/list/' + sheetID + '/'+worksheetNum+'/public/values?alt=json&max-results=1&start-index=' + $(this).attr('data-rownum') + '&query=' + $(this).attr('query');
                        sessionStorage.tempURL = url;
                        sessionStorage.rowid = $(this).attr('data-rownum');
                    });
                    $("*[data-rownum]").bind({
                        'touchstart': function() {
                            sessionStorage.tempURL = url + '&start-index=' + $(this).attr('data-rownum') + '&query=' + $(this).attr('query');
                            sessionStorage.rowid = $(this).attr('data-rownum');
                        }
                    });
                    return i < rows;

                };

                var thisText = $(container).html();
                if (thisText.indexOf("&nbsp;") != -1) {
                    newText = thisText.replace("&nbsp;", "");
                    $(container).html(newText);
                }


            });
 
        }




          
             



    }

 
     
}))