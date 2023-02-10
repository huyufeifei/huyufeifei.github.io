var images = new Array(
    [],

    ["image/000_1", "image/000_2"],

    ["image/001_1", "image/001_2"],

    ["image/002_1", "image/002_2"],

    ["image/003_1", "image/003_2"],

    ["image/004_1", "image/004_2"],

    ["image/005_1", "image/005_2"],

    ["image/006_1", "image/006_2"],

    ["image/007_1", "image/007_2"],

    ["image/008_1", "image/008_2"],

    ["image/009_1", "image/009_2"],

    ["image/010_1", "image/010_2"],

    ["image/011_1", "image/011_2"],

    ["image/012_1", "image/012_2"],

    ["image/013_1", "image/013_2"]
);

var dx = [0, 1, 0, -1];
var dy = [1, 0, -1, 0];
var char = ["R", "D", "L", "U"];
var Base = 100,
    count = 0,
    nowChoose, n, m;
var mapp = new Array(),
    vis = new Array(),
    ans = new Array();

function tr(x, y) {
    return (x - 1) * Base + y - 1;
}

function tr2(x, y) {
    return x * (m + 2) + y;
}

function rd(l, r) {
    return Math.floor(Math.random() * (r - l + 1)) + l;
}

function valid(x, y) {
    return 0 <= x && x <= n + 1 && 0 <= y && y <= m + 1;
}

function random_shuffle(a) {
    for (let i = 2; i < a.length; i++) {
        let j = rd(1, i);
        if (i == j) { continue; }
        let temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
    return a;
}

function getImage(id) {
    let x = Math.floor(id / Base) + 1,
        y = id % Base + 1;
    if (ans[x][y] > 0)
        return images[ans[x][y]][0];
    else
        return images[-ans[x][y]][1];
}

function generate(_n, _m) {
    n = _n;
    m = _m;
    console.log("n=" + n + "m=" + m);
    if (((n * m) % 2) == 1) {
        return -1;
    }
    Base = m;
    let p = new Array();
    for (let i = 0; i < images.length; i++) {
        p[i] = i;
    }
    p = random_shuffle(p);
    let temp = new Array();
    ans = new Array();
    mapp = new Array();
    vis = new Array();
    for (let i = 0; i <= n + 1; i++) {
        mapp[i] = new Array();
        ans[i] = new Array();
        vis[i] = new Array();
        for (let j = 0; j <= m + 1; j++) {
            mapp[i][j] = 0;
        }
    }
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            mapp[i][j] = 1;
        }
    }
    for (let i = 1; i <= n; i++) {
        temp.push(tr(i, 1));
        temp.push(tr(i, m));
        mapp[i][1] = 2;
        mapp[i][m] = 2;
    }
    for (let i = 2; i < m; i++) {
        temp.push(tr(1, i));
        temp.push(tr(n, i));
        mapp[1][i] = 2;
        mapp[n][i] = 2;
    }
    for (let Time = 0; Time < n * m / 2; Time++) {
        let A = rd(0, temp.length - 1);
        let Ax = Math.floor(temp[A] / Base) + 1;
        let Ay = temp[A] % Base + 1;
        temp.splice(A, 1);
        // update
        for (let i = 0; i < 4; i++) {
            let nx = Ax + dx[i],
                ny = Ay + dy[i];
            if (mapp[nx][ny] == 1) {
                mapp[nx][ny] = 2;
                temp.push(tr(nx, ny));
            }
        }

        let B = rd(0, temp.length - 1);
        let Bx = Math.floor(temp[B] / Base) + 1;
        let By = temp[B] % Base + 1;
        temp.splice(B, 1);
        for (let i = 0; i < 4; i++) {
            let nx = Bx + dx[i],
                ny = By + dy[i];
            if (mapp[nx][ny] == 1) {
                mapp[nx][ny] = 2;
                temp.push(tr(nx, ny));
            }
        }

        ans[Ax][Ay] = p[Time % (p.length - 1) + 1];
        ans[Bx][By] = -p[Time % (p.length - 1) + 1];
    }
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            mapp[i][j] = 1;
        }
    }
    count = n * m / 2;
    nowChoose = -1;
    return 0;
}

function match(A, B) {
    let Ax = Math.floor(A / Base) + 1,
        Ay = A % Base + 1,
        Bx = Math.floor(B / Base) + 1,
        By = B % Base + 1;
    if (ans[Ax][Ay] + ans[Bx][By] != 0 || mapp[Ax][Ay] == 0 || mapp[Bx][By] == 0) {
        return -1;
    }
    console.log("inside");
    for (let i = 0; i <= n + 1; i++) {
        for (let j = 0; j <= m + 1; j++) {
            vis[i][j] = 0;
        }
    }
    let Q = new Array();
    let QQ = new Array();
    let path = "";
    Q.push(tr2(Ax, Ay));
    console.log("Q.push : " + Ax + " " + Ay + " : " + tr2(Ax, Ay));
    QQ.push("");
    while (Q.length) {
        let x = Math.floor((Q[0]) / (m + 2)),
            y = Q[0] % (m + 2);
        console.log("inBFS: " + x + " " + y);
        console.log("Q[0]=" + Q[0]);
        Q.shift();
        let str = QQ.shift();
        for (let i = 0; i < 4; i++) {
            let nx = x + dx[i],
                ny = y + dy[i];
            if (!valid(nx, ny)) continue;
            if (nx == Bx && ny == By) {
                --count;
                mapp[Ax][Ay] = mapp[Bx][By] = 0;
                return str + char[i];
            }
            if (mapp[nx][ny] == 1) continue;
            if (vis[nx][ny]) continue;
            vis[nx][ny] = 1;
            Q.push(tr2(nx, ny));
            console.log("Q.push : " + nx + " " + ny + " : " + tr2(nx, ny));
            QQ.push(str + char[i]);
        }
    }
    if (path == "") {
        console.log("bad");
        return -1;
    }
    --count;
    return path;
}

function select(A) {
    if (nowChoose == -1) {
        nowChoose = A;
        setOpacity(A, 0.5);
        return;
    }
    if (A == nowChoose) {
        nowChoose = -1;
        setOpacity(A, 1);
        return;
    }
    var res = match(A, nowChoose);
    if (res == -1) {
        setOpacity(nowChoose, 1);
        setOpacity(A, 0.5);
        nowChoose = A;
        return;
    }
    // matched 
    setOpacity(nowChoose, 1);
    setOpacity(A, 1);
    console.log("drae line : " + A + " " + nowChoose + " " + res);
    drawLine(A, nowChoose, res);
    nowChoose = -1;
    if (count == 0) {
        setTimeout(() => {
            win();
        }, 1000);
    }
    return;
}