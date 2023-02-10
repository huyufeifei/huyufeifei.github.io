let num = 0
let now_w = 0
let now_h = 0
let mg = 0

function new_item() {
	$('#creator input').val("");
	$('#creator').css('display', 'flex');
}

function show_item() {
	// id, imgUrl, title, subtitle
	++num;
	let title = $('#tt').val();
	let subtitle = $('#stt').val();
	let imgUrl = $('#iu').val();
	let id = `item${num}`;
	$('#inner_container').append(`<div id="${id}" class="item"><span>${title}</span><img src="${imgUrl}"></img><span><button onclick="del('#${id}')">删除</button>${subtitle}</span></div>`);
	if (now_h != 0) {
		$(`#${id}`).css('height', now_h.toString())
	}
	if (now_w != 0) {
		$(`#${id}`).css('width', now_w.toString())
	}
	if (mg != 0) {
		$(`#${id}`).css('margin', mg.toString())
	}
	$(`#${id}`).mouseenter(function () {
		$(`#${id} span button`).css('display', 'inline');
	});
	$(`#${id}`).mouseleave(function () {
		$(`#${id} span button`).css('display', 'none');
	});
	$('#tt').val("");
	$('#stt').val("");
	$('#iu').val("");
}

function cancel() {
	$('#creator').css('display', 'none');
	$('#creator input').val("");
}

function del(id) {
	$(id).remove();
}

function chW(w) {
	if (!isNaN(Number(w))) {
		$('.item').css('width', w)
		now_w = w;
	}
}

function chH(h) {
	if (!isNaN(Number(h))) {
		$('.item').css('height', h)
		now_h = h;
	}
}

function chTW(tw) {
	if (!isNaN(Number(tw))) {
		$('#main_container').css('width', tw)
	}
}

function chM(m) {
	if (!isNaN(Number(m))) {
		mg = (Number(m) / 2);
		$('.item').css('margin', mg.toString() + 'px');
	}
}