import java.util.*;

public class Main {
    static class Trie {
        Trie[] ch;
        int wt;
        boolean ended;

        Trie() {
            ch = new Trie[26];
            wt = 0;
            ended = false;
        }
    }

    static Trie root = new Trie();

    static void insert(Trie root, String s) {
        Trie temp = root;
        for (char ci : s.toCharArray()) {
            int ind = ci - 'a';
            if (temp.ch[ind] == null) {
                temp.ch[ind] = new Trie();
            }
            temp = temp.ch[ind];
            temp.wt++;
        }
        temp.ended = true;
    }

    static void Exist(Trie root, String s) {
        Trie temp = root;
        for (char ci : s.toCharArray()) {
            int ind = ci - 'a';
            if (temp.ch[ind] == null) {
                System.out.println("Not Found");
                return;
            }
            temp = temp.ch[ind];
        }
        System.out.println("Found");
    }

    static void getAllwords(Trie root, List<String> li, String te) {
        if (root.ended) {
            li.add(te);
        }

        for (int i = 0; i < 26; i++) {
            if (root.ch[i] != null) {
                char ch = (char) (i + 'a');
                getAllwords(root.ch[i], li, te + ch);
            }
        }
    }

    static boolean getAllprefix(Trie root, List<String> li, String ps) {
        Trie temp = root;
        for (char ci : ps.toCharArray()) {
            int ind = ci - 'a';
            if (temp.ch[ind] == null) {
                return false;
            }
            temp = temp.ch[ind];
        }

        getAllwords(temp, li, ps);
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        while (true) {
            System.out.println("\nOptions:");
            System.out.println("1: Insert word");
            System.out.println("2: Check if word exists");
            System.out.println("3: Get all words with given prefix");
            System.out.println("4: Print all words from current Trie");
            System.out.println("5: Exit");
            System.out.print("Enter your option: ");
            int opt = sc.nextInt();

            if (opt == 1) {
                System.out.print("Enter the string to insert: ");
                String s = sc.next();
                insert(root, s);

            } 
            else if (opt == 2) 
            {
                System.out.print("Enter the string to check: ");
                String s = sc.next();
                Exist(root, s);

            } else if (opt == 3) {
                System.out.print("Enter the prefix: ");
                String s = sc.next();
                List<String> li = new ArrayList<>();
                boolean ans = getAllprefix(root, li, s);
                if (ans) {
                    System.out.println("Words with prefix '" + s + "': " + li);
                } else {
                    System.out.println("Prefix not found.");
                }

            } else if (opt == 4) {
                List<String> li = new ArrayList<>();
                getAllwords(root, li, "");
                System.out.println("All words: " + li);

            } else if (opt == 5) {
                System.out.println("Exiting...");
                break;

            } else {
                System.out.println("Invalid option.");
            }
        }

        sc.close();
    }
}
