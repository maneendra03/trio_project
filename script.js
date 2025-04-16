class TrieNode {
    constructor(letter = "") {
      this.letter = letter;
      this.children = {};
      this.end = false;
    }
  }
  
  class Trie {
    constructor() {
      this.root = new TrieNode("root");
    }
  
    insert(word) {
      let node = this.root;
      for (let ch of word) {
        if (!node.children[ch]) {
          node.children[ch] = new TrieNode(ch);
        }
        node = node.children[ch];
      }
      node.end = true;
    }
  
    search(word) {
      let node = this.root;
      for (let ch of word) {
        if (!node.children[ch]) return false;
        node = node.children[ch];
      }
      return node.end;
    }
  
    startsWith(prefix) {
      let node = this.root;
      for (let ch of prefix) {
        if (!node.children[ch]) return null;
        node = node.children[ch];
      }
      return node;
    }
  
    getWordsFromNode(node, prefix, result = []) {
      if (node.end) result.push(prefix);
      for (let ch in node.children) {
        this.getWordsFromNode(node.children[ch], prefix + ch, result);
      }
      return result;
    }
  
    getWordsWithPrefix(prefix) {
      let node = this.startsWith(prefix);
      if (!node) return [];
      return this.getWordsFromNode(node, prefix);
    }
  
    getAllWords() {
      return this.getWordsFromNode(this.root, "");
    }
  
    getDOMTree(node = this.root) {
      const ul = document.createElement('ul');
      for (let key in node.children) {
        const child = node.children[key];
        const li = document.createElement('li');
        li.innerHTML = `${child.letter}${child.end ? '<span class="word-end">✔️</span>' : ''}`;
        const childUl = this.getDOMTree(child);
        if (Object.keys(child.children).length > 0) {
          li.appendChild(childUl);
        }
        ul.appendChild(li);
      }
      return ul;
    }
  
    render() {
      const container = document.getElementById('treeView');
      container.innerHTML = "<strong>root</strong>";
      const tree = this.getDOMTree();
      container.appendChild(tree);
    }
  }
  
  const trie = new Trie();
  
  function performOperation() {
    const input = document.getElementById("wordInput");
    const operation = document.getElementById("operationType").value;
    const value = input.value.trim().toLowerCase();
    const output = document.getElementById("output");
  
    if ((operation !== "getall") && (!value || !/^[a-z]+$/.test(value))) {
      alert("Please enter a valid lowercase word (a-z only).");
      return;
    }
  
    if (operation === "insert") {
      trie.insert(value);
      trie.render();
      output.innerHTML = `✅ Inserted "<strong>${value}</strong>"`;
    } else if (operation === "search") {
      const found = trie.search(value);
      output.innerHTML = `🔍 Search "<strong>${value}</strong>": ${found ? '<span style="color:green;">Found ✔️</span>' : '<span style="color:red;">Not Found ❌</span>'}`;
    } else if (operation === "prefix") {
      const results = trie.getWordsWithPrefix(value);
      if (results.length) {
        output.innerHTML = `🧩 Words with prefix "<strong>${value}</strong>": <ul>${results.map(w => `<li>${w}</li>`).join('')}</ul>`;
      } else {
        output.innerHTML = `🚫 No words found with prefix "<strong>${value}</strong>"`;
      }
    } else if (operation === "getall") {
      const allWords = trie.getAllWords();
      if (allWords.length) {
        output.innerHTML = `📋 All inserted words: <ul>${allWords.map(w => `<li>${w}</li>`).join('')}</ul>`;
      } else {
        output.innerHTML = `📭 No words inserted yet.`;
      }
    }
  
    input.value = "";
  }
  