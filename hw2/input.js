/*
* all the code for homework 2 goes into this file.
You will attach event handlers to the document, workspace, and targets defined in the html file
to handle mouse, touch and possible other events.

You will certainly need a large number of global variables to keep track of the current modes and states
of the interaction.
*/

import { Context , Touch} from './state.js';

let targets = document.querySelectorAll('.target');
const Target = new Context();
const TouchMode = new Touch();
// document.addEventListener('click', Target.onClickOutside.bind())

const workspace = document.querySelector('#workspace');
workspace.addEventListener('click', Target.onClickOutside.bind(Target));

workspace.addEventListener('touchstart', TouchMode.onTouchStartOutside.bind(TouchMode));
workspace.addEventListener('touchmove', TouchMode.onDragOutside.bind(TouchMode));
workspace.addEventListener('click', TouchMode.onTouchEndOutside.bind(TouchMode));

for(let i=0;i<targets.length;i++){
    targets[i].addEventListener('mousedown', Target.onMouseDown.bind(Target, i));
    targets[i].addEventListener('mouseup', Target.onMouseUp.bind(Target));
    targets[i].addEventListener('click', Target.onClick.bind(Target,i));
    targets[i].addEventListener('mousemove', Target.onMouseMove.bind(Target));
    targets[i].addEventListener('dblclick', Target.onDoubleClick.bind(Target, i));

    targets[i].addEventListener("touchstart", TouchMode.onTouchStart.bind(TouchMode,i));
    targets[i].addEventListener("touchmove", TouchMode.onTouchMove.bind(TouchMode));
    targets[i].addEventListener("click", TouchMode.onTouchClick.bind(TouchMode));
    targets[i].addEventListener("tochend", TouchMode.onTouchEnd.bind(TouchMode));
    

}
document.addEventListener("keydown", Target.onESC.bind(Target));


