<% _.each(fonts, function(font) { %>
@font-face {
  font-family: "<%= font.family %>";
  src: url('<%= font.path %><%= font.filename %>.eot');
  src: url('<%= font.path %><%= font.filename %>.eot?#iefix') format('eot'),
    url('<%= font.path %><%= font.filename %>.woff2') format('woff2'),
    url('<%= font.path %><%= font.filename %>.woff') format('woff'),
    url('<%= font.path %><%= font.filename %>.svg#<%= font.family %>') format('svg');
  font-weight: <%= font.weight %>;
  font-style: <%= font.style %>;
}
<% }); %>
