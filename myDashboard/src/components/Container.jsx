import icHidden from "./../assets/ic_hidden.png"
import { useState, useRef } from "react"

const fontSizeClasses = ['text-xs', 'text-sm', 'text-md', 'text-lg', 'text-xl'];

const Container = () => {
  const [sizeIndex, setSizeIndex] = useState(1); // 기본 - text-sm
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  const [content, setContent] = useState('');
  const editorRef = useRef(null);

  const increaseFont = () => {
    if (sizeIndex < fontSizeClasses.length - 1) {
      setSizeIndex(sizeIndex + 1);
    }
  };

  const decreaseFont = () => {
    if (sizeIndex > 0) {
      setSizeIndex(sizeIndex - 1);
    }
  };

  const handleInput = (e) => {
    const text = e.target.innerText.trim();
    setContent(text);

    if (text.endsWith('/')) {
      setShowCommandMenu(true);
    } else {
      setShowCommandMenu(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const selection = window.getSelection();
      if (!selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      let currentDiv = getCurrentDiv(range.startContainer);

      // 정상적인 경우 다음 줄 추가
      const newDiv = document.createElement('div');
      newDiv.contentEditable = "true";
      newDiv.className = fontSizeClasses[sizeIndex] + " pt-1";
      newDiv.innerHTML = "<br>";

      if (currentDiv.nextSibling) {
        currentDiv.parentNode.insertBefore(newDiv, currentDiv.nextSibling);
      } else {
        currentDiv.parentNode.appendChild(newDiv);
      }

      setCaretAtStart(newDiv);
      setShowCommandMenu(false);
    }
    if (e.key === 'Backspace') {
      const editor = editorRef.current;

      // 내용이 하나의 div뿐이고, 그 안에 텍스트도 없을 때
      if (
        editor.childNodes.length === 1 &&
        editor.childNodes[0].innerText.trim() === ''
      ) {
        e.preventDefault(); // 백스페이스 막기
        return;
      }
    }
  };

  // 현재 커서가 속한 div 찾기
  const getCurrentDiv = (node) => {
    while (node && node !== editorRef.current) {
      if (node.nodeType === 1 && node.tagName === 'DIV') {
        return node;
      }
      node = node.parentNode;
    }
    return null;
  };

  const setCaretAtStart = (el) => {
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(true);

    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  };

const applyCommand = (type) => {
  const editor = editorRef.current;
  if (!editor) return;

  const selection = window.getSelection();
  const range = selection?.getRangeAt(0);
  const currentDiv = getCurrentDiv(range?.startContainer);

  // divider 외엔 현재 div에서 명령 적용
  if (type !== 'divider' && currentDiv) {
    currentDiv.classList.remove('list-disc', 'pl-4', 'border', 'border-gray-300', 'rounded-md');
    const checkboxes = currentDiv.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => cb.remove());

    if (type === 'todo') {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'mr-2';
      currentDiv.prepend(checkbox);
    }

    if (type === 'list') {
      currentDiv.classList.add('list-disc', 'pl-4');
    }

    if (type === 'border') {
      currentDiv.classList.add('border', 'border-gray-300', 'rounded-md');
    }
  }


  // ✅ divider는 새 div로 추가
  if (type === 'divider') {
    // 현재 줄 내용 제거
    if (currentDiv) {
      currentDiv.innerText = ''; // 슬래시 포함된 입력 제거
    }

    const newDiv = document.createElement('div');
    newDiv.contentEditable = "true";
    newDiv.className = fontSizeClasses[sizeIndex] + " pt-2 border-t border-gray-300";
    newDiv.innerHTML = "<br>";

    if (currentDiv?.nextSibling) {
      currentDiv.parentNode.insertBefore(newDiv, currentDiv.nextSibling);
    } else {
      editor.appendChild(newDiv);
    }

    setCaretAtStart(newDiv);
  }

  setShowCommandMenu(false);
};


  return (
    <div className="w-[calc(100%-400px)] min-w-[700px] h-[400px] shrink-0 py-4 ps-2 pe-4">
      <section className="bg-white rounded-lg h-full p-5">
        <div className="flex items-center mb-3">
          <h3 className="ms-1">메모</h3>
          <div className="ms-auto h-[22px]">
            <button onClick={increaseFont} className="cursor-pointer border border-gray-400 rounded-l-sm p-[2px]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
            <button onClick={decreaseFont} className="cursor-pointer border border-s-0 border-gray-400 rounded-r-sm p-[2px]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
              </svg>
            </button>
          </div>
          <button className="cursor-pointer ms-3">
            <img src={icHidden} alt="가리기 아이콘" className="w-[22px]" />
          </button>
        </div>

        {/* 에디터 영역 */}
        <div className="relative w-full">
          {/* 플레이스홀더 */}
          {content === '' && (
            <div className="absolute top-2 left-2 pt-1 text-gray-400 pointer-events-none select-none">
              텍스트를 입력해주세요. / 입력을 해보세요.
            </div>
          )}

          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            className={`focus:outline-none w-full p-2 min-h-[250px] ${fontSizeClasses[sizeIndex]}`}
            spellCheck={false}
          >
            {/* 초기엔 빈 div 한 줄 */}
            <div className="pt-1"><br /></div>
          </div>

          {/* 명령창 */}
          {showCommandMenu && (
            <div className="absolute left-2 top-12 w-64 bg-white border border-gray-300 rounded-md shadow-md z-10">
              {/* <li onClick={() => applyCommand('todo')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">☑️ 체크리스트</li>
              <li onClick={() => applyCommand('list')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">📋 일반 리스트</li> */}
              <li onClick={() => applyCommand('divider')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">➖ 구분선 넣기</li>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Container;
