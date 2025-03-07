import path from "node:path";
import fs from "node:fs";

// 文件根目录
const DIR_PATH = path.resolve();
// 白名单,过滤不是文章的文件和文件夹
const WHITE_LIST = [
  "index.md",
  ".vitepress",
  "node_modules",
  ".idea",
  "assets",
];

// 判断是否是文件夹
const isDirectory = (path) => fs.lstatSync(path).isDirectory();

// 取差值
const intersections = (arr1, arr2) =>
  Array.from(new Set(arr1.filter((item) => !new Set(arr2).has(item))));

// 把方法导出直接使用
function getList(params, path1, pathname, flag) {
  const res = [];
  for (let file in params) {
    const dir = path.join(path1, params[file]);
    const isDir = isDirectory(dir);
    if (isDir) {
      if (flag) {
        const files = fs.readdirSync(dir);
        res.push({
          text: params[file],
          collapsible: true,
          items: getList(files, dir, `${pathname}/${params[file]}`),
        });
      }
    } else {
      const name = path.basename(params[file]);
      const suffix = path.extname(params[file]);
      if (suffix !== ".md") {
        continue;
      }
      res.push({
        text: name,
        link: pathname.startsWith('/') ? `${pathname}/${name}` : `/${pathname}/${name}`,
      });
    }
  }
  res.forEach(item => {
    item.text = item.text.replace(/\.md$/, "");
    if (item.link) {
      item.link = item.link.startsWith('/') ? item.link : `/${item.link}`;
    }
  });
  return res;
}

// 参数1是文件夹路径,参数二控制是否显示文件夹下面的文件,如果为false则只显示当前文件夹内的文件,不会遍历子级文件夹内的文件(默认是true,会遍历)
export const set_sidebar = (pathname, flag = true) => {
  try {
    const dirPath = path.join(DIR_PATH, pathname);
    if (!fs.existsSync(dirPath)) {
      console.warn(`目录 ${dirPath} 不存在`);
      return [];
    }
    const files = fs.readdirSync(dirPath);
    const items = intersections(files, WHITE_LIST);
    return getList(items, dirPath, pathname, flag);
  } catch (error) {
    console.error(`生成侧边栏时发生错误: ${error.message}`);
    return [];
  }
};