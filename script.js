const canvas = document.getElementById("canvas");
canvas.width = 1360;
canvas.height = 768;

const reset_id = document.getElementById("resetB");
const undo_id = document.getElementById("undoB");
const clear_id = document.getElementById("clearB");
const select_id = document.getElementById("preview_cursor_list");

let context = canvas.getContext("2d");
let start_background_color = "white";
context.fillStyle = start_background_color;
context.fillRect(0, 0, canvas.width, canvas.height);

//crosshair configs
const preview_cursor_list = document.getElementById("preview_cursor_list");
function change_crosshair() {
  if (preview_cursor_list.value == "crosshair") {
    // Crosshair (default)
    document.getElementById("canvas").style.cursor =
      "url('./cursors/crosshair.cur'), default";
  }
  if (preview_cursor_list.value == "circle") {
    // Circle aim
    document.getElementById("canvas").style.cursor =
      "url('./cursors/circle.cur'), default";
  }
  if (preview_cursor_list.value == "circle_and_dot") {
    // Circle aim but with a dot in center
    document.getElementById("canvas").style.cursor =
      "url('./cursors/circle_and_dot.cur'), default";
  }
}

preview_cursor_list.addEventListener("dblclick", betterCrossHair, false);

function betterCrossHair(){
  document.getElementById("canvas").style.cursor =
      "url('./cursors/look_to_circle.cur'), default";
}

let draw_color = "black";
let draw_width = "2";
let is_drawing = false;

//bug correction (firefox)
let restore_array = [];
let index = -1;

function change_color(element) {
  let list = element.style.background.split(" ");
  draw_color = list[0];
}

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
// do onClick event for draw ".", ex: canvas.addEventListener("onclick", start,false), should return a "." draw
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.key === "z") {
    undo_last();
  }
});

function start(event) {
  is_drawing = true;
  context.beginPath();
  context.moveTo(
    event.clientX - 0 - canvas.offsetLeft,
    event.clientY - 0 - canvas.offsetTop
  );
  event.preventDefault();
}

function draw(event) {
  if (is_drawing) {
    context.lineTo(
      event.clientX - 0 - canvas.offsetLeft,
      event.clientY - 0 - canvas.offsetTop
    );
    context.strokeStyle = draw_color;
    context.lineWidth = draw_width;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  }
  event.preventDefault();
}

function stop(event) {
  if (is_drawing) {
    context.stroke();
    context.closePath();
    is_drawing = false;
  }

  event.preventDefault();
  if (event.type != "mouseout") {
    restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
  }
}

function clear_canvas() {
  context.fillStyle = start_background_color;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(0, 0, canvas.width, canvas.height);

  restore_array = [];
  index = -1;
}

function undo_last() {
  if (index <= 0) {
    clear_canvas();
  } else {
    index -= 1;
    restore_array.pop();
    context.putImageData(restore_array[index], 0, 0);
  }
}

const buttons = document.getElementsByClassName("button");

reset_id.addEventListener("mouseenter", getSolid_reset, false);
undo_id.addEventListener("mouseenter", getSolid_undo, false);
clear_id.addEventListener("mouseenter", getSolid_clear, false);
select_id.addEventListener("mouseenter", getSolid_select, false);
reset_id.addEventListener("mouseout", getOpaque_reset, false);
undo_id.addEventListener("mouseout", getOpaque_undo, false);
clear_id.addEventListener("mouseout", getOpaque_clear, false);
select_id.addEventListener("mouseout", getOpaque_select, false);

// ------------------------------------x------------------------------------

function getSolid_reset() {
  reset_id.style.backgroundColor = "white";
}
function getSolid_undo() {
  undo_id.style.backgroundColor = "white";
}
function getSolid_clear() {
  clear_id.style.backgroundColor = "white";
}
function getSolid_select() {
  select_id.style.backgroundColor = "white";
}
// ------------------------------------x------------------------------------

function getOpaque_reset() {
  reset_id.style.backgroundColor = "#ffffffcb";
}
function getOpaque_undo() {
  undo_id.style.backgroundColor = "#ffffffcb";
}
function getOpaque_clear() {
  clear_id.style.backgroundColor = "#ffffffcb";
}
function getOpaque_select() {
  select_id.style.backgroundColor = "#ffffffcb";
}

// ------------------------------------x------------------------------------
function changeCrosshairStyle() {}

function reset_draw_width() {
  return (draw_width = "2");
}
