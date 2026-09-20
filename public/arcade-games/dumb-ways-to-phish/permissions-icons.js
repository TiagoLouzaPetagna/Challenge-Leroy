// Small game-native illustrations stay sharp at every viewport size.
const shapes={
 photos:'<rect x="11" y="14" width="42" height="36" rx="5" fill="#80d4f6"/><circle cx="42" cy="25" r="5" fill="#ffcf55"/><path d="M13 45 25 33l8 8 7-7 11 11" fill="#4acb89"/>',
 camera:'<path d="M9 21h12l4-6h15l4 6h11v29H9Z" fill="#77ceef"/><circle cx="32" cy="35" r="11" fill="#fff2bb"/><circle cx="32" cy="35" r="5" fill="#ff875b"/>',
 contacts:'<rect x="13" y="8" width="38" height="48" rx="5" fill="#ffeab3"/><circle cx="29" cy="27" r="8" fill="#fa9777"/><path d="M19 45q10-15 20 0M43 25h5M43 34h5M43 43h5" fill="none"/>',
 messages:'<path d="M9 12h46v33H30L18 55V45H9Z" fill="#ffcf6c"/><path d="M18 23h28M18 32h20" fill="none"/>',
 location:'<path d="M32 57S13 37 13 26a19 19 0 1 1 38 0c0 11-19 31-19 31Z" fill="#fa7767"/><circle cx="32" cy="26" r="7" fill="#fff3bd"/>',
 notifications:'<path d="M18 43h28l-5-8V24q0-10-9-10t-9 10v11Z" fill="#ffcb5d"/><path d="M28 49q4 8 8 0" fill="none"/>',
 microphone:'<rect x="25" y="9" width="14" height="31" rx="7" fill="#ff8370"/><path d="M18 32q0 18 14 18t14-18M32 50v8M23 58h18" fill="none"/>',
 files:'<path d="M8 20h19l5 6h24v27H8Z" fill="#f5c45f"/><path d="M8 20V12h21l5 8" fill="#fff1b9"/>',
 calendar:'<rect x="10" y="14" width="44" height="42" rx="5" fill="#fff2bd"/><path d="M10 27h44M21 9v11M43 9v11" fill="none"/><path d="M19 36h8v8h-8zM37 36h8v8h-8z" fill="#f78a64"/>',
 qr:'<rect x="10" y="10" width="44" height="44" rx="4" fill="#fff1bf"/><path d="M17 17h10v10H17zM37 17h10v10H37zM17 37h10v10H17zM36 37h4v4h-4zM46 36v10h-6" fill="none"/>',
 video:'<rect x="8" y="17" width="35" height="32" rx="6" fill="#80d6ec"/><path d="m43 26 13-7v28l-13-7Z" fill="#f6856b"/>',
};
export function iconMarkup(id){
  const shape=shapes[id]??shapes.files;
  return `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="#102442" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round">${shape}</g><path d="M8 59q9 3 16 0M47 7q5 0 9 4" fill="none" stroke="#102442" stroke-width="2" stroke-linecap="round"/></svg>`;
}
