# Why another Ember typings when there are already some in DefinetelyTyped repository?

Because I was really unhappy when tried to use Ember's typings from DefinetelyTyped repository.
They are not very actively maintained, some recent routing stuff which you need in the very beginning of
the official tutorial is missing, and some basic things are just very inconvenient to use (like,
for example, the need to pass explicit result type to Something.create, Something.extend,
lack of argument signatures, etc). So I felt it was perfectly reasonable to write new typings from scratch incorporating
bottom-up approach: not trying to make everything at once by looking in fuzzy/incomplete/deprecated docs,
but adding things as I need them in real-world scenarios in a way that feels most comfortable to use.
This approach results in much more fine-grained signatures, which allow to use Ember with Typescript idiomatically.

# Why Typescript?

For more IDE assistance, type-safety, and abstraction (by getting big picture by looking at signatures).
Just for a little example, when I've tried to use fixtures for the first time,
I've been getting [this incomprehensible error](http://pastebin.com/pcYXGtxy) at runtime. It took me some time
to realize each record should necessary have an 'id' field in it.
Typescript's structural type system allows to force this at typelevel,
and now every Ember newbie ( who is smart enough to use ember.ts :) will see
compile-time error indicating that field 'id' is missing in her fixture's entries.

# The Gentle(wo)man's Typing Paradigm

1. Don't use typescript's classes! Use interfaces for object signatures, and var ascriptions for module signatures.
    The great feature of typescript's interfaces is that they are open for future refinements. Typescript's classes,
    on the other hand, are closed and thus unacceptable for most javascript.

    Example:

    ```ts
        interface Application {
            ApplicationAdapter: DS.Adapter;
            Store: DS.Store;
            Router: Ember.Router;
        }

        var Application: {
            create(options?: TsApplicationOptions): Application;
        };
    ```

2. Use mixin-typing for methods like create and extend.
    This gives autocompletion and typecheck inside arguments of those methods invocations.

    Example:

    ```ts
        interface TsApplicationOptions {
            customEvents?: {};
            rootElement?: string;
            LOG_TRANSITIONS?: boolean;
            LOG_TRANSITIONS_INTERNAL?: boolean;
        }
    ```

# Naming Conventions

Additional interfaces, which are not present in Ember sources or docs, are prefixed with 'Ts'.

# Current Status

Suspended. After some use of TS in my Ember project, I've realized it has few critical problems at the moment:

1. TypeScript's compiler and corresponding mode in IDEA both
   are unacceptably slow when working with more than few files.
2. Lack of [this-typing](https://typescript.codeplex.com/workitem/507).
3. Lack of [union-types](https://typescript.codeplex.com/workitem/1364).

Actually, only the first one really makes me stop using it for now.