// === [1] 텍스트 객체 상태 관리 및 실시간 동기화 객체 ===[cite: 1]
window.LabelState = window.LabelState || {
    selectedId: null,
    elements: {}
};

document.addEventListener("DOMContentLoaded", function() {
    // 1. 저장된 상태 불러오기 (새로고침 후 복원)[cite: 1]
    loadStateFromStorage();

    // 2. 드래그 앤 드롭 구현 (마우스 / 터치)[cite: 1]
    initDragAndDrop();

    // 3. 물리 키보드 방향키 미세 조정 리스너[cite: 1]
    document.addEventListener("keydown", function(e) {
        if (!window.LabelState.selectedId) return;
        const activeEl = document.getElementById(window.LabelState.selectedId);
        if (!activeEl) return;

        let step = e.shiftKey ? 5 : 1; 
        let x = parseFloat(activeEl.getAttribute("data-x")) || 0;
        let y = parseFloat(activeEl.getAttribute("data-y")) || 0;

        if (e.key === "ArrowLeft") { x -= step; e.preventDefault(); }
        else if (e.key === "ArrowRight") { x += step; e.preventDefault(); }
        else if (e.key === "ArrowUp") { y -= step; e.preventDefault(); }
        else if (e.key === "ArrowDown") { y += step; e.preventDefault(); }
        else { return; }

        updateElementPosition(window.LabelState.selectedId, x, y);
    });

    // 4. 사파리 및 모바일 환경 textarea 줄바꿈 개행문자 제어
    document.addEventListener("keydown", function(e) {
        if (e.target && e.target.classList.contains("fixed-text-input")) {
            if (e.key === "Enter") {
                e.stopPropagation(); // 포커스 탈출 및 폼 전송 방지, 개행 유지
            }
        }
    });

    // 5. 텍스트 입력값 변경 시 실시간 동기화 바인딩
    document.addEventListener("input", function(e) {
        if (e.target && e.target.classList.contains("fixed-text-input")) {
            const id = e.target.getAttribute("data-target-id");
            if (id) {
                const targetEl = document.getElementById(id);
                if (targetEl) {
                    targetEl.innerText = e.target.value;
                    saveStateToStorage(id, { content: e.target.value });
                }
            }
        }
    });
});

// === [2] 좌표 변경 및 실시간 동기화 함수 ===[cite: 1]
window.updateElementPosition = function(id, x, y) {
    const el = document.getElementById(id);
    if (!el) return;

    el.setAttribute("data-x", x);
    el.setAttribute("data-y", y);
    el.style.transform = `translate(${x}px, ${y}px)`;

    const inputX = document.getElementById("coordX");
    const inputY = document.getElementById("coordY");
    if (inputX && document.activeElement !== inputX) inputX.value = x;
    if (inputY && document.activeElement !== inputY) inputY.value = y;

    saveStateToStorage(id, { x, y });
};

// === [3] 모바일 전용 방향키 컨트롤러 동작 함수 ===[cite: 1]
window.moveSelectedElement = function(dx, dy) {
    const id = window.LabelState.selectedId;
    if (!id) {
        alert("선택된 텍스트 객체가 없습니다.");
        return;
    }
    const el = document.getElementById(id);
    let x = (parseFloat(el.getAttribute("data-x")) || 0) + dx;
    let y = (parseFloat(el.getAttribute("data-y")) || 0) + dy;
    
    updateElementPosition(id, x, y);
};

// === [4] 로컬 스토리지 / 내부 State 저장 및 복원 (새로고침 유지) ===[cite: 1]
function saveStateToStorage(id, newData) {
    let savedData = JSON.parse(localStorage.getItem("label_editor_state") || "{}");
    if (!savedData[id]) savedData[id] = {};
    
    savedData[id] = { ...savedData[id], ...newData };
    localStorage.setItem("label_editor_state", JSON.stringify(savedData));
}

function loadStateFromStorage() {
    let savedData = JSON.parse(localStorage.getItem("label_editor_state") || "{}");
    for (const [id, data] of Object.entries(savedData)) {
        const el = document.getElementById(id);
        if (el) {
            if (data.x !== undefined && data.y !== undefined) {
                el.setAttribute("data-x", data.x);
                el.setAttribute("data-y", data.y);
                el.style.transform = `translate(${data.x}px, ${data.y}px)`;
            }
            if (data.content !== undefined) {
                el.innerText = data.content;
                const textarea = document.querySelector(`[data-target-id="${id}"]`);
                if (textarea) textarea.value = data.content;
            }
        }
    }
}

// === [5] 드래그 앤 드롭 바인딩 함수 ===[cite: 1]
function initDragAndDrop() {
    const draggables = document.querySelectorAll(".draggable-text-node");
    draggables.forEach(el => {
        let isDragging = false;
        let startX, startY, initialX, initialY;

        el.addEventListener("mousedown", dragStart);
        el.addEventListener("touchstart", dragStart, {passive: true});

        function dragStart(e) {
            window.LabelState.selectedId = el.id;
            isDragging = true;
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;
            
            startX = clientX;
            startY = clientY;
            initialX = parseFloat(el.getAttribute("data-x")) || 0;
            initialY = parseFloat(el.getAttribute("data-y")) || 0;

            document.addEventListener("mousemove", drag);
            document.addEventListener("touchmove", drag, {passive: false});
            document.addEventListener("mouseup", dragEnd);
            document.addEventListener("touchend", dragEnd);
        }

        function drag(e) {
            if (!isDragging) return;
            if (e.type === 'touchmove') e.preventDefault();

            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;

            const dx = clientX - startX;
            const dy = clientY - startY;

            const currentX = initialX + dx;
            const currentY = initialY + dy;

            updateElementPosition(el.id, currentX, currentY);
        }

        function dragEnd() {
            isDragging = false;
            document.removeEventListener("mousemove", drag);
            document.removeEventListener("touchmove", drag);
            document.removeEventListener("mouseup", dragEnd);
            document.removeEventListener("touchend", dragEnd);
        }
    });
}
