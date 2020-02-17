$(document).ready(function () {

            function GetMaxNumericIndex(vSerialNo) {
                var vIndexOfStr = -1;
                for (var i = vSerialNo.length - 1; i >= 0; i--) {
                    var til = vSerialNo[i];
                    if (parseInt(vSerialNo[i]) || vSerialNo[i] == "0") {
                        vIndexOfStr = i;
                    } else {
                        break;
                    }
                }
                return vIndexOfStr;
            }

            function AutoBarCodeGenerate(barCodeStartsId, barCodeQtyId) {
                var serialNo = $('#' + barCodeStartsId + '').val();
                var barcodeQtyText = $('#' + barCodeQtyId + '').val();
                var isnumeric = $.isNumeric(barcodeQtyText);
                if (serialNo != '' && barcodeQtyText != "" && $.isNumeric(barcodeQtyText)) {
                    var barcodeQty = parseInt(barcodeQtyText);

                    var indexOfStr = -1;

                    var number = 0; 
                    var numberLength = 0;
                    var textPart = "";
                    var serialList = [];

                    indexOfStr = GetMaxNumericIndex(serialNo);

                    if (indexOfStr < 0) {
                        serialNo += '-1';
                        indexOfStr = GetMaxNumericIndex(serialNo);
                    }
                    if (indexOfStr > -1) {
                        number = parseInt(serialNo.substring(indexOfStr, serialNo.length));
                        numberLength = serialNo.substring(indexOfStr, serialNo.length).length;
                        textPart = serialNo.substring(0, indexOfStr);
                        serialList = [];
                        serialList.push(serialNo);
                        for (var i = 1; i < barcodeQty; i++) {
                            var vFinalNumber = PadRight((number + i), numberLength);
                            serialList.push(textPart + vFinalNumber);
                        }
                        for (var i = 0; i < serialList.length; i++) {
                            var markup = "<tr><td>" + (i+1) + "</td><td>" + serialList[i] + "</td></tr>";
                            $("table tbody").append(markup);
                        }
                        $('#' + barCodeQtyId + '').val('');
                        $('#' + barCodeStartsId + '').val('');
                    }
                }
                else if (serialNo == '') {
                    alert("Serial Number can not be empty.");
                }
                else if (barcodeQtyText == '') {
                    alert("Quantity of Serial Number can not be empty.");
                } else {
                    alert("Quantity of Serial Number must be numeric.");
                }
            };

            function PadRight(vNumber, length) {
                if (vNumber.length > length) {
                    return number;
                }
                var str = '' + vNumber;
                while (str.length < length) {
                    str = '0' + str;
                }
                return str;
            };

            $("#btnGenerateSerial").click(function () {
                AutoBarCodeGenerate('txtSerialNo', 'txtSerialQty');
            });

            $("#btnTableClear").click(function () {
                $("table tbody").empty();
            });

        });
	window.onload = function(){
	  var tableCont = document.querySelector('#table-cont')
	  function scrollHandle (e){
		var scrollTop = this.scrollTop;
		this.querySelector('thead').style.transform = 'translateY(' + scrollTop + 'px)';
	  }
	  
	  tableCont.addEventListener('scroll',scrollHandle)
	}