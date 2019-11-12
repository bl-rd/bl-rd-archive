module.exports = function blogFooter(content) {
    let response = `
<footer class="max-width:none">
<ol class="max-width:none">
${content}
</ol>
</footer>
`;

    return response;
};