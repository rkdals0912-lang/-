// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    
    // 라벨 테두리 토글 기능 제어
    const showBorderToggle = document.getElementById('showBorderToggle');
    const canvasBox = document.querySelector('.canvasBox');

    if (showBorderToggle && canvasBox) {
        showBorderToggle.addEventListener('change', function() {
            if (this.checked) {
                canvasBox.style.border = '2.5px solid var(--ink)'; // 체크 시 테두리 보이기
            } else {
                canvasBox.style.border = 'none'; // 체크 해제 시 테두리 숨기기
            }
        });
    }

    console.log("탑씰 라벨 프로그램 스크립트가 정상 로드되었습니다.");
});