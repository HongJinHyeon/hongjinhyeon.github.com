function calculate_max_floors() {
    var max_sec;
    var current_kill_count;
    var attack;
    var defense;
    var health;
    var total_kill_count = 0;
    var effectiveRibirthTime = 0;

    var killcount1;
    var killcount2;
    var killcount3;

    //knight
    attack = document.getElementById("Part1_Attack1").value;
    defense = document.getElementById("Part1_Defense1").value;
    health = document.getElementById("Part1_HP1").value;
    max_sec = calculate_max_alive_time(defense, health);

    effectiveRibirthTime = max_sec;

    current_kill_count = getTotalKillCount(attack, max_sec);
    total_kill_count += current_kill_count;
    killcount1 = current_kill_count;

    document.getElementById("Part1_SurvivalMiniute1").value = parseInt(max_sec / 60);
    document.getElementById("Part1_KillCount1").value = addComma(current_kill_count);

    //Archer
    attack = document.getElementById("Part1_Attack2").value;
    defense = document.getElementById("Part1_Defense2").value;
    health = document.getElementById("Part1_HP2").value;
    max_sec = calculate_max_alive_time(defense, health);

    if (max_sec < effectiveRibirthTime) {
        effectiveRibirthTime = max_sec;
    }


    current_kill_count = getTotalKillCount(attack, max_sec);
    total_kill_count += current_kill_count;
    killcount2 = current_kill_count;

    document.getElementById("Part1_SurvivalMiniute2").value = parseInt(max_sec / 60);
    document.getElementById("Part1_KillCount2").value = addComma(current_kill_count);

    //Mage
    attack = document.getElementById("Part1_Attack3").value;
    defense = document.getElementById("Part1_Defense3").value;
    health = document.getElementById("Part1_HP3").value;

    max_sec = calculate_max_alive_time(defense, health);
    current_kill_count = getTotalKillCount(attack, max_sec);
    total_kill_count += current_kill_count;
    killcount3 = current_kill_count;

    if (max_sec < effectiveRibirthTime) {
        effectiveRibirthTime = max_sec;
    }

    document.getElementById("Part1_SurvivalMiniute3").value = parseInt(max_sec / 60);
    document.getElementById("Part1_KillCount3").value = addComma(current_kill_count);


    var maxFloor = (parseInt(total_kill_count / 10) + 1);
    document.getElementById("Part1_Total Floors").value = maxFloor + " floors  |  " + (total_kill_count % 10) + "/10";


    effectiveRibirthTime = parseInt(effectiveRibirthTime / 60);

    if (effectiveRibirthTime > 60) {
        document.getElementById("Part1_EffectiveRebirthTime").value =  parseInt(effectiveRibirthTime / 60) + ":" + pad(parseInt(effectiveRibirthTime % 60),2);
    }
    else {
        document.getElementById("Part1_EffectiveRebirthTime").value =  pad(effectiveRibirthTime,2);
    }




    //Drop Rate
    var kv_floor_bonus_1000 = 20.0;
    var floor_drop_bonus = kv_floor_bonus_1000 * (maxFloor / 1000.0);
    var drop_rate;


    //1.knight
    drop_rate = get_drop_rate_with_luck(document.getElementById("Part1_Luck1").value);
    drop_rate += floor_drop_bonus;


    if (drop_rate > 100.0) { drop_rate = 100.0; }
    document.getElementById("Part1_DropRate1").value = drop_rate.toFixed(2) + " %";


    //2.Archer
    drop_rate = get_drop_rate_with_luck(document.getElementById("Part1_Luck2").value);
    drop_rate += floor_drop_bonus;

    if (drop_rate > 100.0) { drop_rate = 100.0; }
    document.getElementById("Part1_DropRate2").value = drop_rate.toFixed(2) + " %";


    //3.Mage
    drop_rate = get_drop_rate_with_luck(document.getElementById("Part1_Luck3").value);
    drop_rate += floor_drop_bonus;

    if (drop_rate > 100.0) { drop_rate = 100.0; }
    document.getElementById("Part1_DropRate3").value = drop_rate.toFixed(2) + " %";



    //[Magic Water]
    var mw_killcount;
    var mw_luck;
    var mw_now;
    var mw_total = 0;

    mw_killcount = killcount1;
    mw_luck = document.getElementById("Part1_Luck1").value;
    mw_now = get_MagicWater(mw_killcount, mw_luck, maxFloor);
    document.getElementById("Part1_MW1").value = mw_now;
    mw_total = mw_now;

    mw_killcount = killcount2;
    mw_luck = document.getElementById("Part1_Luck2").value;
    mw_now = get_MagicWater(mw_killcount, mw_luck, maxFloor);
    document.getElementById("Part1_MW2").value = mw_now;
    mw_total = parseFloat(mw_total) + parseFloat(mw_now);

    mw_killcount =killcount3;
    mw_luck = document.getElementById("Part1_Luck3").value;
    mw_now = get_MagicWater(mw_killcount, mw_luck, maxFloor);
    document.getElementById("Part1_MW3").value = mw_now;
    mw_total = parseFloat(mw_total) + parseFloat(mw_now);

    document.getElementById("Part1_TotalMW").value = mw_total.toFixed(2) + " Magic Waters";


}

function pad(n, width) 
{
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

function get_MagicWater(kill_count, luck, maxFloor) {
    var powder = 0;
    var kv_kill_powder_rate = 50;

    var current_powder = parseInt(kill_count) / parseInt(kv_kill_powder_rate);
    var scaler = 1.0 + (parseInt(luck) / 1000.0);
    if (scaler > 8) {
        scaler = 8;
    }

    //alert(kill_count);
    //alert(luck);
    //alert(maxFloor);
    //alert(current_powder);
    //alert(scaler);
    //alert(current_powder * scaler);

    //return  current_powder * scaler;

    current_powder = current_powder * scaler;

    current_powder = parseFloat(current_powder * (1.0 + (Math.min(1000, maxFloor) / 500.0)));

    if (current_powder <= 0) {
        current_powder = 1;
    }

    return current_powder.toFixed(2);
}

function get_drop_rate_with_luck(luck) {

    var stage_drop_rate = parseInt(document.getElementById("Part1_StageDropBonus").value);
    var nowLuck = parseInt(luck);

    var addition = stage_drop_rate * (nowLuck / parseInt(nowLuck + parseInt("777")));

    return parseInt(stage_drop_rate + addition);

}


function calculate_max_alive_time(_defence, _health) {
    var damage_per_min = 25;
    var knightdefence = Number(_defence);
    damage_per_min -= parseFloat(25) * knightdefence / (knightdefence + Number("1000"));
    var alive_sec = parseInt(60 * _health / damage_per_min);

    return alive_sec;
}

function getTotalKillCount(_attack, max_sec) {
    var current_kill_count = parseInt(_attack * max_sec / 60 / 200);
    if (current_kill_count == 0) {
        current_kill_count = 1;
    }

    return current_kill_count;
}


function getOriginStat(itemlevel, nowStat) {
    var percent = 1.0;

    switch (itemlevel) {
        case "1":
            percent = 1;
            break;
        case "2":
            percent = 1.2;
            break;
        case "3":
            percent = 1.4;
            break;
        case "4":
            percent = 1.8;
            break;
        case "5":
            percent = 2.6;
            break;
        default:
            break;
    }

    return parseInt((parseFloat(nowStat) / parseFloat(percent)));

}

function calculate_max_ItemLevel() {


    document.getElementById("Part2_Stat1Result").value = "";
    document.getElementById("Part2_Stat2Result").value = "";
    document.getElementById("Part2_Stat3Result").value = "";
 
    var percent = 1.0;

    switch (document.getElementById("Part2_TargetItemLevel").value) {
        case "2":
            percent = 1.2;
            break;
        case "3":
            percent = 1.4;
            break;
        case "4":
            percent = 1.8;
            break;
        case "5":
            percent = 2.6;
            break;
        default:
            break;
    }

    var max_stat;

    if (document.getElementById("Part2_Stat1").value != "") {

        var origin1stat = getOriginStat(document.getElementById("Part2_NowItemLevel").value, document.getElementById("Part2_Stat1").value);
        max_stat = parseInt(parseInt(origin1stat) * percent);
        document.getElementById("Part2_Stat1Result").value = max_stat + " (+" + (max_stat - document.getElementById("Part2_Stat1").value) + ")";
    }
    if (document.getElementById("Part2_Stat2").value != "") {

        var origin2stat = getOriginStat(document.getElementById("Part2_NowItemLevel").value, document.getElementById("Part2_Stat2").value);
        max_stat = parseInt(parseInt(origin2stat) * percent);
        document.getElementById("Part2_Stat2Result").value = max_stat + " (+" + (max_stat - document.getElementById("Part2_Stat2").value) + ")";
    }
    if (document.getElementById("Part2_Stat3").value != "") {

        var origin3stat = getOriginStat(document.getElementById("Part2_NowItemLevel").value, document.getElementById("Part2_Stat3").value);
        max_stat = parseInt(parseInt(origin3stat) * percent);
        document.getElementById("Part2_Stat3Result").value = max_stat + " (+" + (max_stat - document.getElementById("Part2_Stat3").value) + ")";
    }


}

function calculate_origin_ItemLevel() {


    document.getElementById("Part3_Stat1Result").value = "";
    document.getElementById("Part3_Stat2Result").value = "";
    document.getElementById("Part3_Stat3Result").value = "";

    var percent = 1.0;

    switch (document.getElementById("Part3_NowItemLevel").value) {
        case "2":
            percent = 1.2;
            break;
        case "3":
            percent = 1.4;
            break;
        case "4":
            percent = 1.8;
            break;
        case "5":
            percent = 2.6;
            break;
        default:
            break;
    }

    if (document.getElementById("Part3_Stat1").value != "") {
        document.getElementById("Part3_Stat1Result").value = Math.ceil(parseFloat(document.getElementById("Part3_Stat1").value) / percent);
    }

    if (document.getElementById("Part3_Stat2").value != "") {
        document.getElementById("Part3_Stat2Result").value = Math.ceil(parseFloat(document.getElementById("Part3_Stat2").value) / percent);
    }

    if (document.getElementById("Part3_Stat3").value != "") {
        document.getElementById("Part3_Stat3Result").value = Math.ceil(parseFloat(document.getElementById("Part3_Stat3").value) / percent);
    }
}

function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
}

function setCookie(name, value) {
    var date = new Date();
    date.setTime(date.getTime() + 1000 * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
}

function getCookie(name) {

    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
}

function save_now_stats() {
    setCookie("K1", document.getElementById("Part1_Attack1").value);
    setCookie("A1", document.getElementById("Part1_Attack2").value);
    setCookie("M1", document.getElementById("Part1_Attack3").value);
    setCookie("K2", document.getElementById("Part1_Defense1").value);
    setCookie("A2", document.getElementById("Part1_Defense2").value);
    setCookie("M2", document.getElementById("Part1_Defense3").value);
    setCookie("K3", document.getElementById("Part1_HP1").value);
    setCookie("A3", document.getElementById("Part1_HP2").value);
    setCookie("M3", document.getElementById("Part1_HP3").value);
    setCookie("K4", document.getElementById("Part1_Luck1").value);
    setCookie("A4", document.getElementById("Part1_Luck2").value);
    setCookie("M4", document.getElementById("Part1_Luck3").value);
    alert("save complete!");
}

function load_saved_stats() {
    document.getElementById("Part1_Attack1").value = getCookie("K1");
    document.getElementById("Part1_Attack2").value = getCookie("A1");
    document.getElementById("Part1_Attack3").value = getCookie("M1");

    document.getElementById("Part1_Defense1").value = getCookie("K2");
    document.getElementById("Part1_Defense2").value = getCookie("A2");
    document.getElementById("Part1_Defense3").value = getCookie("M2");

    document.getElementById("Part1_HP1").value = getCookie("K3");
    document.getElementById("Part1_HP2").value = getCookie("A3");
    document.getElementById("Part1_HP3").value = getCookie("M3");

    document.getElementById("Part1_Luck1").value = getCookie("K4");
    document.getElementById("Part1_Luck2").value = getCookie("A4");
    document.getElementById("Part1_Luck3").value = getCookie("M4");
    alert("load complete!");
}

function load_palyerStatAndRevenu()
{
    load_palyerStat();
    load_palyerRevenu();
}

function load_palyerStat()
{
    
    var EOSAccountName = document.getElementById("EOSAccountName").value

    if (EOSAccountName == "") return;

    var data = JSON.stringify({"json":true,"code":"eosknightsio","scope":"eosknightsio","table":"knight","key_type":"name","lower_bound":EOSAccountName,"index_position":1,"limit":1});
    
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {

        var resultObj = JSON.parse(this.responseText);
       
        document.getElementById("Part1_Attack1").value = resultObj.rows[0].rows[0].attack;
        document.getElementById("Part1_Attack2").value = resultObj.rows[0].rows[1].attack;
        document.getElementById("Part1_Attack3").value = resultObj.rows[0].rows[2].attack;

        document.getElementById("Part1_Defense1").value = resultObj.rows[0].rows[0].defense;
        document.getElementById("Part1_Defense2").value = resultObj.rows[0].rows[1].defense;
        document.getElementById("Part1_Defense3").value = resultObj.rows[0].rows[2].defense;

        document.getElementById("Part1_HP1").value = resultObj.rows[0].rows[0].hp;
        document.getElementById("Part1_HP2").value = resultObj.rows[0].rows[1].hp;
        document.getElementById("Part1_HP3").value = resultObj.rows[0].rows[2].hp;

        document.getElementById("Part1_Luck1").value = resultObj.rows[0].rows[0].luck;
        document.getElementById("Part1_Luck2").value = resultObj.rows[0].rows[1].luck;
        document.getElementById("Part1_Luck3").value = resultObj.rows[0].rows[2].luck;

    }
    });

    xhr.open("POST", "https://eos.greymass.com/v1/chain/get_table_rows");
    xhr.send(data);
}

function load_palyerRevenu()
{
    
    var EOSAccountName = document.getElementById("EOSAccountName").value

    if (EOSAccountName == "") return;
   
    var data = JSON.stringify({"json":true,"code":"eosknightsio","scope":"eosknightsio","table":"revenue","key_type":"name","lower_bound":EOSAccountName,"index_position":1,"limit":1});

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {

        var resultObj = JSON.parse(this.responseText);
        var profit = parseFloat(  resultObj.rows[0].selling.replace("EOS","")) - parseFloat( resultObj.rows[0].spending.replace("EOS","")) - parseFloat( resultObj.rows[0].buying.replace("EOS",""));

        document.getElementById("revenue").innerHTML = " Your profit : " + profit.toFixed(4) + " EOS ( Selling:" + resultObj.rows[0].selling + ",Spending:" + ( parseFloat( resultObj.rows[0].spending.replace("EOS","")) + parseFloat( resultObj.rows[0].buying.replace("EOS","")) ).toFixed(4) + " EOS )";
    }
    });

    xhr.open("POST", "https://eos.greymass.com/v1/chain/get_table_rows");
    xhr.send(data);
}