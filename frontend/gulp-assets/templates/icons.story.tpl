/* eslint-disable */

/*
  ATTENTION! This file is created automatically with gulp!
  ********************************************************
*/

import { storiesOf } from "@storybook/vue";

import FIcon from "@/components/FIcon";

storiesOf("Icons", module)
  .add("default", () => ({
    components: {
      FIcon
    },
    template: ` 
      <div style="display: flex; ">
        <% _.each(glyphs, function(glyph) { %>
          <div style="width: 100px; margin: 30px; text-align: center">
            <div style="font-size: 50px">
              <FIcon name="<%= className %>-<%= glyph.name %>" />
            </div>
            <p style="font-size: 12px"><%= className %>-<%= glyph.name %></p>
            <p style="font-size: 10px; color: #999;">CSS unicode: "\\<%= glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase() %>"</p>
          </div>
        <% }); %>
      </div>
    `
  }));
