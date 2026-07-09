/* DIESEL CODE VAULT
   A real, working code-snippet library — Java, Python, and JavaScript. Every snippet here
   is meant to run as-is (or with trivial adaptation), not fictional flavor text.
*/
const CODE_VAULT = [
  // ---------------- PYTHON ----------------
  {
    id: 'py-binary-search', lang: 'python', category: 'Algorithms', title: 'Binary Search',
    desc: 'Finds the index of a target in a sorted list in O(log n) time.',
    code: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

# example
nums = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print(binary_search(nums, 23))  # -> 5`
  },
  {
    id: 'py-quicksort', lang: 'python', category: 'Algorithms', title: 'Quicksort',
    desc: 'Classic recursive quicksort using list comprehensions.',
    code: `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

print(quicksort([9, 3, 7, 1, 8, 2, 5]))  # -> [1, 2, 3, 5, 7, 8, 9]`
  },
  {
    id: 'py-fibonacci-memo', lang: 'python', category: 'Algorithms', title: 'Fibonacci with Memoization',
    desc: 'Fast recursive Fibonacci using functools.lru_cache to avoid recomputation.',
    code: `from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

print([fib(i) for i in range(15)])`
  },
  {
    id: 'py-file-io', lang: 'python', category: 'File Handling', title: 'Read / Write a Text File',
    desc: 'Safe file reading and writing using the `with` context manager.',
    code: `# writing
with open('notes.txt', 'w', encoding='utf-8') as f:
    f.write("First line\\n")
    f.write("Second line\\n")

# reading
with open('notes.txt', 'r', encoding='utf-8') as f:
    for line in f:
        print(line.strip())

# reading all lines into a list
with open('notes.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()`
  },
  {
    id: 'py-json-file', lang: 'python', category: 'File Handling', title: 'Read / Write JSON',
    desc: 'Persisting a Python dict/list to a JSON file and loading it back.',
    code: `import json

data = {"name": "Lolo", "role": "developer", "projects": ["Nursing Hub", "UniHub", "DIESEL"]}

# save
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

# load
with open('data.json', 'r', encoding='utf-8') as f:
    loaded = json.load(f)

print(loaded['projects'])`
  },
  {
    id: 'py-requests-get', lang: 'python', category: 'Networking', title: 'HTTP GET Request',
    desc: 'Calling a REST API with the `requests` library and handling errors.',
    code: `import requests

def get_json(url):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None

data = get_json("https://api.github.com/users/octocat")
if data:
    print(data["login"], data["public_repos"])`
  },
  {
    id: 'py-class-inheritance', lang: 'python', category: 'OOP', title: 'Class Inheritance',
    desc: 'A basic class hierarchy showing inheritance, super(), and method overriding.',
    code: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return f"{self.name} makes a sound."

class Dog(Animal):
    def speak(self):
        return f"{self.name} barks."

class Cat(Animal):
    def speak(self):
        return f"{self.name} meows."

animals = [Dog("Rex"), Cat("Milo"), Animal("Generic")]
for a in animals:
    print(a.speak())`
  },
  {
    id: 'py-linked-list', lang: 'python', category: 'Data Structures', title: 'Singly Linked List',
    desc: 'A minimal linked list implementation with append, print, and reverse.',
    code: `class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, value):
        node = Node(value)
        if not self.head:
            self.head = node
            return
        curr = self.head
        while curr.next:
            curr = curr.next
        curr.next = node

    def reverse(self):
        prev = None
        curr = self.head
        while curr:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt
        self.head = prev

    def __str__(self):
        vals = []
        curr = self.head
        while curr:
            vals.append(str(curr.value))
            curr = curr.next
        return " -> ".join(vals)

ll = LinkedList()
for v in [1, 2, 3, 4]:
    ll.append(v)
print(ll)          # 1 -> 2 -> 3 -> 4
ll.reverse()
print(ll)          # 4 -> 3 -> 2 -> 1`
  },
  {
    id: 'py-decorator', lang: 'python', category: 'Patterns', title: 'Timing Decorator',
    desc: 'A reusable decorator that measures how long a function takes to run.',
    code: `import time
from functools import wraps

def timed(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timed
def slow_sum(n):
    return sum(range(n))

slow_sum(10_000_000)`
  },

  // ---------------- JAVA ----------------
  {
    id: 'java-binary-search', lang: 'java', category: 'Algorithms', title: 'Binary Search',
    desc: 'Iterative binary search over a sorted int array.',
    code: `public class BinarySearch {
    public static int search(int[] arr, int target) {
        int low = 0, high = arr.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) return mid;
            else if (arr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] nums = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
        System.out.println(search(nums, 23)); // 5
    }
}`
  },
  {
    id: 'java-bubble-sort', lang: 'java', category: 'Algorithms', title: 'Bubble Sort',
    desc: 'Simple in-place bubble sort with an early-exit optimization.',
    code: `public class BubbleSort {
    public static void sort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }

    public static void main(String[] args) {
        int[] arr = {9, 3, 7, 1, 8, 2, 5};
        sort(arr);
        for (int n : arr) System.out.print(n + " "); // 1 2 3 5 7 8 9
    }
}`
  },
  {
    id: 'java-arraylist', lang: 'java', category: 'Data Structures', title: 'ArrayList Basics',
    desc: 'Common ArrayList operations: add, remove, iterate, sort.',
    code: `import java.util.ArrayList;
import java.util.Collections;

public class ArrayListDemo {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();
        names.add("Fatma");
        names.add("Omar");
        names.add("Sara");

        names.remove("Omar");
        names.add(1, "Youssef");

        Collections.sort(names);

        for (String name : names) {
            System.out.println(name);
        }
    }
}`
  },
  {
    id: 'java-hashmap', lang: 'java', category: 'Data Structures', title: 'HashMap Iteration',
    desc: 'Building and iterating over a HashMap with entrySet().',
    code: `import java.util.HashMap;
import java.util.Map;

public class HashMapDemo {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Math", 95);
        scores.put("Physics", 88);
        scores.put("Nursing 101", 97);

        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            System.out.println(entry.getKey() + " -> " + entry.getValue());
        }

        System.out.println("Average: " +
            scores.values().stream().mapToInt(Integer::intValue).average().orElse(0));
    }
}`
  },
  {
    id: 'java-file-io', lang: 'java', category: 'File Handling', title: 'Read a Text File Line by Line',
    desc: 'Using try-with-resources and BufferedReader for safe file reading.',
    code: `import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class ReadFile {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(new FileReader("notes.txt"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.err.println("Error reading file: " + e.getMessage());
        }
    }
}`
  },
  {
    id: 'java-inheritance', lang: 'java', category: 'OOP', title: 'Inheritance & Polymorphism',
    desc: 'Abstract base class with two subclasses overriding a method.',
    code: `abstract class Shape {
    abstract double area();
}

class Circle extends Shape {
    double radius;
    Circle(double radius) { this.radius = radius; }
    double area() { return Math.PI * radius * radius; }
}

class Rectangle extends Shape {
    double width, height;
    Rectangle(double width, double height) { this.width = width; this.height = height; }
    double area() { return width * height; }
}

public class ShapeDemo {
    public static void main(String[] args) {
        Shape[] shapes = { new Circle(3), new Rectangle(4, 5) };
        for (Shape s : shapes) {
            System.out.printf("%s area: %.2f%n", s.getClass().getSimpleName(), s.area());
        }
    }
}`
  },
  {
    id: 'java-try-catch', lang: 'java', category: 'Patterns', title: 'Try / Catch / Finally Template',
    desc: 'The standard exception-handling structure with a custom exception example.',
    code: `class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) { super(message); }
}

public class ExceptionDemo {
    static void checkAge(int age) throws InvalidAgeException {
        if (age < 0 || age > 120) {
            throw new InvalidAgeException("Age must be between 0 and 120, got: " + age);
        }
    }

    public static void main(String[] args) {
        try {
            checkAge(-5);
        } catch (InvalidAgeException e) {
            System.err.println("Caught: " + e.getMessage());
        } finally {
            System.out.println("Validation attempt finished.");
        }
    }
}`
  },
  {
    id: 'java-thread', lang: 'java', category: 'Concurrency', title: 'Basic Thread',
    desc: 'Running work on a background thread using Runnable.',
    code: `public class ThreadDemo {
    public static void main(String[] args) throws InterruptedException {
        Runnable task = () -> {
            for (int i = 1; i <= 3; i++) {
                System.out.println("Working... step " + i);
                try { Thread.sleep(300); } catch (InterruptedException ignored) {}
            }
        };

        Thread worker = new Thread(task);
        worker.start();
        worker.join(); // wait for it to finish
        System.out.println("Done.");
    }
}`
  },

  // ---------------- JAVASCRIPT ----------------
  {
    id: 'js-debounce', lang: 'javascript', category: 'Patterns', title: 'Debounce Function',
    desc: 'Delays running a function until a burst of calls has stopped — great for search inputs.',
    code: `function debounce(fn, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// usage
const onSearch = debounce((value) => {
  console.log('searching for:', value);
}, 400);

searchInput.addEventListener('input', (e) => onSearch(e.target.value));`
  },
  {
    id: 'js-array-methods', lang: 'javascript', category: 'Arrays', title: 'map / filter / reduce',
    desc: 'The three core array transformation methods, chained together.',
    code: `const students = [
  { name: 'Lolo', grade: 92 },
  { name: 'Sara', grade: 78 },
  { name: 'Omar', grade: 85 },
];

const passingNames = students
  .filter(s => s.grade >= 80)
  .map(s => s.name);

const average = students.reduce((sum, s) => sum + s.grade, 0) / students.length;

console.log(passingNames); // ['Lolo', 'Omar']
console.log(average.toFixed(1));`
  },
  {
    id: 'js-fetch-api', lang: 'javascript', category: 'Networking', title: 'Fetch API with Error Handling',
    desc: 'A robust fetch wrapper with timeout and JSON parsing.',
    code: `async function fetchJSON(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (err) {
    console.error('Fetch failed:', err.message);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

fetchJSON('https://api.github.com/users/octocat').then(console.log);`
  },
  {
    id: 'js-promise-all', lang: 'javascript', category: 'Async', title: 'Promise.all for Parallel Requests',
    desc: 'Running multiple async operations concurrently and waiting for all of them.',
    code: `async function loadDashboard(userId) {
  const [profile, posts, notifications] = await Promise.all([
    fetch(\`/api/users/\${userId}\`).then(r => r.json()),
    fetch(\`/api/users/\${userId}/posts\`).then(r => r.json()),
    fetch(\`/api/users/\${userId}/notifications\`).then(r => r.json()),
  ]);

  return { profile, posts, notifications };
}`
  },
  {
    id: 'js-local-storage-wrapper', lang: 'javascript', category: 'Patterns', title: 'Safe localStorage Wrapper',
    desc: 'A small helper that never throws, even in private-browsing mode or when storage is full.',
    code: `const Store = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  },
  remove(key) {
    try { localStorage.removeItem(key); } catch (e) {}
  }
};

Store.set('settings', { theme: 'dark', sound: true });
console.log(Store.get('settings'));`
  }
];

const CODE_VAULT_LANGS = ['python', 'java', 'javascript'];
