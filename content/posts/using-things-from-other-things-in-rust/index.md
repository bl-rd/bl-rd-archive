---
title: "Using things from other things in Rust"
date: 2020-09-09T21:13:19+01:00
description: "A brief reminder for future me as to how to include things from other files in Rust"
intro: "In which I try and prevent future headscratching on the topic 🤔"
draft: false
---

This is a post to remind myself _how the hell_ to include things from sub-directories in a Rust project &ndash; something that has tripped me up on multiple occassions now.

**Note**: for an actual detailed explanation, check out [this nice article](http://www.sheshbabu.com/posts/rust-module-system/) by [Sheshbabu Chinnakonda](http://www.sheshbabu.com/).

I will not be going into any of that level of detail here 🙂. This explanation, in all likelihood, is going to be ~~wrong~~ ill-informed in several places!

## The problem

As I've been doing more Rust, I've wanted to organise my projects in a more sane way. But this ain't JavaScriptLand&trade; - no more

```javascript
import { func } from './nice/relative/path';
```

Rust has no concept of what other files/directories you have unless you tell it. Say you have the following structure:

- components
  - super_useful_component.rs
  - quite_useful_component.rs
- systems
  - click_system.rs
- main.rs

`super_useful_component.rs` has the following contents:

```rust
pub fn smile() -> String {
  String::from("☺")
}
```

This function cannot be used anywhere else in the program right now. To fix this, a _mod_ file is needed.

## Mod files

Having to manually create a file that exposes functions, structs etc. does initially seem like a pain, but it is actually quite useful. According to [rust by example](https://doc.rust-lang.org/rust-by-example/index.html):

<blockquote>
  <p>
    Rust provides a powerful module system that can be used to hierarchically split code in logical units (modules), and manage visibility (public/private) between them.
  </p>
  <p>
    A module is a collection of items: functions, structs, traits, impl blocks, and even other modules.
  </p>
  <cite><a href="https://doc.rust-lang.org/rust-by-example/mod.html" rel="nofollow noreferrer">Rust by example</a></cite>
</blockquote>

So to expose the function as part of this _components_ module, we need a `mod` file in the components directory!

```rust components/mod.rs
// expose the file with the `mod` keyword
mod super_useful_component;

// expose the function
pub use self::super_useful_component::smile;
```

Then in the _main_ file, let the program know about the module.

```rust
// the module!
mod components;

use components::smile;

fn main() {
  println!("Hello {}", smile());
  
  // or without the above `use` statement:
  println!("Hello {}", components::smile());
}
```

Now that it is in the main file, it can be used in other directories. For example, in `systems/click_systems.rs`:

```rust
use crate::components::smile;

pub fn click_system() {
  // ...
  let smile_str = smile();
  // ...
} 
```

The `crate` keyword refers to the root of the program. Thinking of it that way, it is actually quite a nice way of building up an application based on hieracrchy and directory structure.

## Wrap up

I'm pretty sure this is going to be a lot easier the more I use Rust &ndash; as a matter of fact it already makes a lot more sense having written it down! For future me, I think the following are the best explainers of Rust's module system (at time of writing):

- The [Modules chapter](https://doc.rust-lang.org/rust-by-example/mod.html) in [Rust by example](https://doc.rust-lang.org/rust-by-example/index.html)
- [Clear explanation of Rust’s module system](http://www.sheshbabu.com/posts/rust-module-system/) by [Sheshbabu Chinnakonda](http://www.sheshbabu.com/)
- The [Managing Growing Projects with Packages, Crates, and Modules chapter](https://doc.rust-lang.org/stable/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html) in [the Rust book](https://doc.rust-lang.org/stable/book/title-page.html)


{{<signoff>}}
