/**
 * For managing data update on database while user typing in the text editor.
 * DB will be updated when they stop typing in 1-2 seconds
 */
export default function debounce(a, b, c) {
    var d, e;
    return function() {
        function h() {
            d = null;
            c || (e = a.apply(f, g));
        }
        var f = this, g = arguments;
        return (clearTimeout(d), d = setTimeout(h, b), c && !d && (e = a.apply(f,g)), e);
    }
}
/**
 * Remove html tags for preview section
 * @param {*} str 
 */
export function removeHTMLTags(str) {
    return str.replace(/<[^>]*>?/gm, '');
}