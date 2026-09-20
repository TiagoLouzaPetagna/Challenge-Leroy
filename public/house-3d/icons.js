const paths={
 house:'M3 10 12 3l9 7M5 9v12h14V9M9 21v-8h6v8',
 check:'m5 12 4 4L19 6', edit:'m4 16-1 5 5-1L20 7l-4-4ZM14 5l5 5',
 expand:'M8 3H3v5m13-5h5v5M3 16v5h5m8 0h5v-5',
 undo:'m8 4-5 5 5 5M3 9h10a7 7 0 0 1 7 7v3',redo:'m16 4 5 5-5 5m5-5H11a7 7 0 0 0-7 7v3',
 grid:'M3 3h18v18H3ZM3 9h18M3 15h18M9 3v18M15 3v18',
 move:'M12 3v18M3 12h18m-12-6 3-3 3 3m-6 12 3 3 3-3M6 9l-3 3 3 3m12-6 3 3-3 3',
 wall:'M3 4h18v16H3ZM3 12h18M9 4v8m6 0v8',
 focus:'M8 3H3v5m13-5h5v5M3 16v5h5m8 0h5v-5M8 8h8v8H8Z',
 plus:'M12 5v14M5 12h14',minus:'M5 12h14',close:'m6 6 12 12M6 18 18 6',
 down:'m6 9 6 6 6-6',up:'m6 15 6-6 6 6',
 box:'m3 7 9-4 9 4v10l-9 4-9-4Zm0 0 9 4 9-4M12 11v10M7 5l10 4',
 rotate:'M3 10a9 9 0 1 1 3 9M3 4v6h6',
 cursor:'m5 3 14 10-7 1-3 7Z', door:'M4 21h16M6 21V3h12v18M14 12h.01',
 floor:'m3 12 9-5 9 5-9 5ZM3 16l9 5 9-5'
};
export function icon(name){const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',paths[name]??paths.house);svg.append(path);return svg;}
export function fillIcons(){document.querySelectorAll('[data-icon]').forEach(el=>el.replaceChildren(icon(el.dataset.icon)));}
