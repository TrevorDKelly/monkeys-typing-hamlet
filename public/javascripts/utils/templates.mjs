const Templates = {}

function compileTemplate(name) {
  const node = document.getElementById(name);
  const template = Handlebars.compile(node.innerHTML);

  if (node.dataset.type = "partial") {
    Handlebars.registerPartial(name, template);
  }

  name = name.slice(0, name.indexOf("_template"));

  Templates[name] = template;
  node.remove();
}

compileTemplate("stats_template");
compileTemplate("monkey_template");
compileTemplate("leaderboard_template");

export default Templates;
