define(["aloha/jquery","table/table-plugin-utils"],function(e,t){var n=function(t,n){null==t&&(t="<td>&nbsp;</td>"),t=e(t).get(0),this.obj=e(t),this.tableObj=n,n.cells.push(this)};return n.prototype.tableObj=undefined,n.prototype.obj=undefined,n.prototype.wrapper=undefined,n.prototype.hasFocus=!1,n.prototype.activate=function(){this.obj.wrapInner("<div/>");var e=this.obj.children("div").eq(0);e.contentEditable(!0),e.addClass("aloha-table-cell-editable");var t=this;return e.bind("focus",function(e){e.currentTarget&&(e.currentTarget.indexOf=function(){return-1}),t._editableFocus(e)}),e.bind("mousedown",function(e){e.currentTarget&&(e.currentTarget.indexOf=function(){return-1}),t._editableMouseDown(e),t._startCellSelection()}),e.bind("blur",function(e){t._editableBlur(e)}),e.bind("keyup",function(e){t._editableKeyUp(e)}),e.bind("keydown",function(e){t._editableKeyDown(e)}),e.bind("mouseover",function(e){t._selectCellRange()}),e.contentEditableSelectionChange(function(t){return Aloha.Selection.onChange(e,t),e}),this.obj.bind("mousedown",function(e){setTimeout(function(){t.wrapper.trigger("focus")},1),t.tableObj.selection.unselectCells(),t._startCellSelection(),e.stopPropagation()}),this.obj.get(0)&&(this.obj.get(0).onselectstart=function(e){return!1}),this.wrapper=this.obj.children(),this.wrapper.get(0)&&(this.wrapper.get(0).onselectstart=function(){window.event.cancelBubble=!0},this.wrapper.get(0).ondragstart=function(){return!1}),this},n.prototype.deactivate=function(){var t=e(this.obj.children(".aloha-table-cell-editable"));t.length&&(t.parent().append(t.contents()),t.remove(),this.obj.unbind("click"),e.trim(this.obj.attr("class"))==""&&this.obj.removeAttr("class"))},n.prototype.toString=function(){return"TableCell"},n.prototype._editableFocus=function(e){this.hasFocus||(this.tableObj.focus(),this.obj.addClass("aloha-table-cell_active"),this.hasFocus=!0,this._selectAll(this.wrapper.get(0)),this.tableObj.selection.selectionType="cell")},n.prototype._editableBlur=function(e){this.hasFocus=!1,this.obj.removeClass("aloha-table-cell_active")},n.prototype._virtualX=function(){var e=this.tableObj.obj.children().children("tr"),n=this.obj.parent().index(),r=this.obj.index();return t.cellIndexToGridColumn(e,n,r)},n.prototype._virtualY=function(){return this.obj.parent("tr").index()},n.prototype._startCellSelection=function(){if(!this.tableObj.selection.cellSelectionMode){this.tableObj.selection.unselectCells(),this.tableObj.selection.cellSelectionMode=!0;var t=this;e("body").bind("mouseup.cellselection",function(){t._endCellSelection()}),this.tableObj.selection.baseCellPosition=[this._virtualY(),this._virtualX()]}},n.prototype._endCellSelection=function(){this.tableObj.selection.cellSelectionMode&&(this.tableObj.selection.cellSelectionMode=!1,this.tableObj.selection.baseCellPosition=null,this.tableObj.selection.lastSelectionRange=null,this.tableObj.selection.selectionType="cell",e("body").unbind("mouseup.cellselection"))},n.prototype._getSelectedRect=function(){var e=this._virtualX(),t=this._virtualY(),n=this.tableObj.selection.baseCellPosition,r=n[1];r>e&&(r=e,e=n[1]);var i=n[0];return i>t&&(i=t,t=n[0]),{top:i,right:e,bottom:t,left:r}},n.prototype._selectCellRange=function(){if(!this.tableObj.selection.cellSelectionMode)return;var n=this._getSelectedRect(),r=this.tableObj,i=r.obj.children().children("tr"),s=t.makeGrid(i);r.selection.selectedCells=[];var o=r.get("classCellSelected");t.walkGrid(s,function(i,s,u){t.containsDomCell(i)&&(u>=n.top&&u<=n.bottom&&s>=n.left&&s<=n.right?(e(i.cell).addClass(o),r.selection.selectedCells.push(i.cell)):e(i.cell).removeClass(o))}),r.selection.notifyCellsSelected()},n.prototype._selectAll=function(t){var n=t.jquery?t.get(0):t;if(!e.browser.msie){var r=window.getSelection();if(r.setBaseAndExtent)r.setBaseAndExtent(n,0,n,Math.max(0,n.innerText.length-1));else{window.opera&&n.innerHTML.substring(n.innerHTML.length-4)=="<BR>"&&(n.innerHTML=n.innerHTML+"&#160;");var i=document.createRange();i.selectNodeContents(n),r.removeAllRanges(),r.addRange(i)}}else if(document.getSelection){var r=document.getSelection(),i=document.createRange();i.selectNodeContents(n),r.removeAllRanges(),r.addRange(i)}else if(document.selection){var i=document.body.createTextRange();i.moveToElementText(n),i.select()}},n.prototype._editableMouseDown=function(e){this.tableObj.selection.unselectCells(),this.tableObj.hasFocus&&e.stopPropagation()},n.prototype._editableKeyUp=function(e){},n.prototype._editableKeyDown=function(e){var t=9;this._checkForEmptyEvent(e);if(this.obj[0]===this.tableObj.obj.find("tr:last td:last")[0]&&t==e.keyCode&&!e.altKey&&!e.shiftKey&&!e.ctrlKey){this.tableObj.addRow(this.obj.parent().index()+1),this.tableObj.cells[this.tableObj.cells.length-1]._selectAll(this.wrapper.get(0)),e.stopPropagation();return}},n.prototype._checkForEmptyEvent=function(t){var n=e(this.wrapper),r=n.text();if(n.children().length>0)return;r===""&&(this.wrapper.text(" "),this.wrapper.get(0).blur(),this.wrapper.get(0).focus())},n.getContainer=function(t){return e(t.firstChild).hasClass("aloha-table-cell-editable")?t.firstChild:t},n});