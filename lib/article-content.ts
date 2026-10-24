import sanitizeHtml from "sanitize-html";
export function articleHtml(content: string): string {
  const source = /<\/?(?:p|h[1-6]|ul|ol|blockquote|div|table)\b/i.test(content) ? content : content.split(/\n\s*\n/).map(p=>`<p>${p.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}</p>`).join("");
  return sanitizeHtml(source, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "img", "span", "mark", "s", "u", "sub", "sup", "input"],
    allowedAttributes: { a:["href","title","target","rel"], img:["src","alt","title","width","height"], "*":["style","data-type","data-checked"], input:["type","checked","disabled"], td:["colspan","rowspan"], th:["colspan","rowspan"], ol:["start"] },
    allowedSchemes:["http","https","mailto","tel"], allowProtocolRelative:false,
    allowedStyles: { "*": { color:[/^#[0-9a-f]{3,8}$/i,/^rgba?\([\d\s.,%]+\)$/i], "background-color":[/^#[0-9a-f]{3,8}$/i,/^rgba?\([\d\s.,%]+\)$/i], "text-align":[/^(left|right|center|justify)$/], "font-size":[/^\d{1,2}px$/], "font-family":[/^(Arial|Georgia|Verdana|monospace|serif|sans-serif)$/] } },
    transformTags:{a:sanitizeHtml.simpleTransform("a",{rel:"noopener noreferrer"})}
  });
}
