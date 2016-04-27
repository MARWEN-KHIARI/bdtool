function getValue(rqt) {
    var ifirst = 0;
    var ilast = 0;
    var data = [];
    ifirst = rqt.indexOf("(", 0) + 1;
    ilast = rqt.indexOf(")", 0);
    var i = ifirst;
    do {
        if (ilast - ifirst < 1) {
            i = ilast;
        }
        else {
            var j = rqt.indexOf(",", i);
            if ((j > 0) && (j < ilast)) {
                var v = rqt.substring(i, j);
                data.push(v);
                i = j + 1;
            } else {
                var v = rqt.substring(i, ilast);
                if (v.lastIndexOf(")") == -1) {
                    data.push(v);
                }
                i = ilast;
            }
        }
    } while (i < ilast);
    return data;
}


function sperateTag(rqt) {
    var ifirst = 0;
    var ilast = 0;
    var data = [];
    ifirst = rqt.indexOf("(", 0) + 1;
    ilast = rqt.indexOf(")", 0);
    var i = ifirst;
    do {
        if (ilast - ifirst < 1) {
            i = ilast;
        }
        else {
            var j = rqt.indexOf(",", i);
            if ((j > 0) && (j < ilast)) {
                var v = rqt.substring(i, j);
                data.push(v);
                i = j + 1;
                if (rqt.charAt(i) == " ")i++;
            } else {
                var v = rqt.substring(i, ilast);
                if (v.lastIndexOf(")") == -1) {
                    data.push(v);
                }
                i = ilast;
            }
        }
    } while (i < ilast);
    return data;
}

function sperateValue(rqv) {
    var ifirst = 0;
    var ilast = 0;
    var data = [];
    var dataL = 0;
    data[dataL] = [];
    ifirst = rqv.indexOf("(", 0) + 1;
    ilast = rqv.indexOf(")", 0);
    ilastest = rqv.lastIndexOf(")");
    var i = ifirst;
    do {
        if (i == ilast) {
            ifirst = rqv.indexOf("(", ilast) + 1;
            ilast = rqv.indexOf(")", ifirst);
            i = ifirst;
            dataL++;
            data[dataL] = [];
            if (ilast - ifirst < 1) {
                if (ilast != ilastest) {
                    do {
                        ifirst = rqv.indexOf("(", ilast) + 1;
                        ilast = rqv.indexOf(")", ifirst);
                        i = ifirst;
                    } while ((ilast - ifirst < 1) || (ilast == ilastest))
                }
            }
        }
        var j = rqv.indexOf(",", i);
        if ((j > 0) && (j < ilast)) {
            var v = rqv.substring(i, j);
            data[dataL].push(v);
            i = j + 1;
        } else {
            var v = rqv.substring(i, ilast);
            if (v.lastIndexOf(")") == -1) {

                data[dataL].push(v);
            }
            i = ilast;
        }

    } while (i < ilastest);
    return data;
}


function modifyReq() {
    var i;
    var j;
    var html = "";
    html += ("<table style='background-color: #fff;text-align: justify' border='1'>");
    html += ("<tr style='background-color: #DDEBF7;'>");
    for (i = 0; i < dataTag.length; i++) html += ("<td><span style='padding:10px;font-weight: 700;float: right;color: #fff'>" + i + "</span><br/> " + dataTag[i] + "</td>");
    html += ("</tr>");

    html += ("<tr>");
    for (i = 0; i < dataTag.length; i++) html += ("<td><label><input type='checkbox' id='c_null_" + i + "' value='isnull'>value nulled</label></td>");
    html += ("</tr>");

    html += ("<tr>");
    for (i = 0; i < dataTag.length; i++) html += ("<td><label><input type='checkbox' id='c_delete_" + i + "' value='delete'>delete tag</label></td>");
    html += ("</tr>");

    html += ("<tr>");
    for (i = 0; i < dataTag.length; i++) html += ("<td><label><input type='checkbox' id='c_rename_" + i + "' value='rename'>rename tag</label><input type='text' style='width: 100px' id='nm_rename_" + i + "' value='" + dataTag[i] + "'></td>");
    html += ("</tr>");

    html += ("<tr>");
    for (i = 0; i < data.length; i++) {
        html += ("<tr style='background-color: #eee;'>");
        for (j = 0; j < data[i].length; j++) {
            html += ("<td>" + (data[i][j]) + "</td>");
        }
        html += ("</tr>");
    }
    html += ("</tr>");
    html += ("</table>");
    //html+=("<hr/>");
    return html;
}

function sqlcreate() {

    var t_delete = [];
    var t_null = [];
    var t_rename = [];
    for (i = 0; i < dataTag.length; i++) {
        if ($('#c_delete_' + i).is(':checked') == true) t_delete[i] = 1; else t_delete[i] = null;
        if ($('#c_null_' + i).is(':checked') == true)t_null[i] = 1; else t_null[i] = null;
        if ($('#c_rename_' + i).is(':checked') == true) t_rename[i] = $('#nm_rename_' + i).val(); else t_rename[i] = null;
    }

    var html = "";
    var i;
    var j;
    html += "<pre><code class='sql' id='copydiv'>";
    for (i = 0; i < data.length; i++) {
        html += (" INSERT INTO " + nmt + " SET ");
        for (j = 0; j < data[i].length; j++) {
            if (t_delete[j] == null) {
                if (t_rename[j] != null) {
                    html += t_rename[j];
                } else {
                    html += dataTag[j];
                }

                if (t_null[j] == 1) {
                    html += "= null";
                } else {
                    html += "=" + data[i][j];
                }
                if (j < data[i].length - 1)html += (", ");
            }

        }
        html += (";<br/><br/>");
    }
    html += "</code></pre>";
    return html;
}