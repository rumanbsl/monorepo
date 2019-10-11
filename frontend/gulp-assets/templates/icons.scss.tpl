@font-face {
  font-family: "<%= fontName %>";
  src: url('<%= fontPath %><%= fontName %>.eot');
  src: url('<%= fontPath %><%= fontName %>.eot?#iefix') format('eot'),
    url('<%= fontPath %><%= fontName %>.woff2') format('woff2'),
    url('<%= fontPath %><%= fontName %>.woff') format('woff'),
    url('<%= fontPath %><%= fontName %>.ttf') format('truetype'),
    url('<%= fontPath %><%= fontName %>.svg#<%= fontName %>') format('svg');
  font-weight: normal;
  font-style: normal;
}

<% _.each(glyphs, function(glyph) { %>.<%= className %>-<%= glyph.name %>:before { content: "\<%= glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase() %>" }
<% }); %>