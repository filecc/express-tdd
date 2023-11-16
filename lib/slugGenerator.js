const fs = require("fs");
const path = require("path");

module.exports = function slugGenerator(title) {
  const posts = JSON.parse(fs.readFileSync(
    path.resolve("./db/posts.json"), "utf-8"));
  const slugList = posts.map((post) => post.slug);

  let slug = title.toLowerCase().split(" ").join("-");

  slug = slug.replace(/[^\w-]+/g, "");

  for (let i = 0; i < slug.length; i++) {
    if (slug[i] === "-" && slug[i + 1] === "-") {
      slug = slug.slice(0, i);
    }
  }
  if(slugList.includes(slug)){
    slug = slug + "-1";
  }
  return slug;
};
