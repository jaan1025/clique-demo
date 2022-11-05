export const isNeedElement = (element: HTMLElement | null): boolean => {
  if (element) {
    if (["A", "BUTTON"].includes(element.nodeName)) return true;
  }
  return false;
};

export const getTrackableElement = (element: HTMLElement): HTMLElement | null => {
  let current: HTMLElement | null = element;
  while (current && !isNeedElement(current)) {
    if (current.nodeName === "HTML" || current.nodeName === "BODY") {
      return null;
    }
    current = current.parentElement;
  }
  return current || null;
};

export function getText(node: Node): string {
  let text = "";
  if (node.nodeType === 3) {
    text = node.textContent?.trim() || '';
  }
  return text;
}

export const getElementText = (element: HTMLElement | null) => {
  if (!element) return "";
  let text = "";
  for (let i = 0; i < element.childNodes.length; i++) {
    text += getText(element.childNodes[i]);
  }
  return text;
};
