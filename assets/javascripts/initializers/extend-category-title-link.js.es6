export default {
  name: "extend-category-title-link",

  initialize: function(container) {
    if (Discourse.CategoryTitleLinkComponent){
      Discourse.CategoryTitleLinkComponent.reopen({
        render: function(buffer) {
          var category = this.get('category'),
              logoUrl = category.get('logo_url'),
              categoryUrl = Discourse.Category.slugFor(category),
              categoryName = Handlebars.Utils.escapeExpression(category.get('name'));

          if (category.get('read_restricted')) {
            buffer.push("<i class='fa fa-lock'></i>");
          }

          var redirect_link;

          if(Discourse.SiteSettings.redirect_link){
            redirect_link = Discourse.SiteSettings.redirect_link;
          } else {
            redirect_link = Discourse.getURL("/c/");
          }

          buffer.push("<a href='" + redirect_link + categoryUrl + "'>");
          buffer.push("<span class='category-name'>" + categoryName + "</span>");

          if (!Em.isEmpty(logoUrl)) { buffer.push("<img src='" + logoUrl + "' class='category-logo'>"); }

          buffer.push("</a>");
        }
      });
    }
  }
};
