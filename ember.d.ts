// Type definitions for Ember.js 1.3.1
// Project: http://emberjs.com/
// Definitions by: Andriy Polishchuk <http://github.com/apsk/>
// Definitions: http://github.com/apsk/ember.ts

interface Function {
    property(...dependentKeys: string[]): Ember.ComputedProperty;
}

declare module DS {
    interface TsRelationOptions {
        async?: boolean;
        inverse?: string;
    }
    function attr(type?: string, options?: { defaultValue: any }): any;
    function hasMany(type?: any, options?: TsRelationOptions): any;
    function belongsTo(type?: any, options?: TsRelationOptions): any;
    interface Store {
        find?(type: string): PromiseArray;
        find?(type: string, id: number): PromiseObject;
        find?(type: string, query: {}): PromiseArray;
        all?(name: string): any;
    }
    var Store: {
        create(options?: { adapter: any }): Store;
        extend(...mixins: Store[]): Store;
    };
    interface Model {
        FIXTURES: { id: number }[];
    }
    var Model: {
        extend(...mixins: {}[]): Model;
    };
    interface Adapter {}
    var Adapter: {
        extend(...mixins: {}[]): Adapter;
    };
    interface FixtureAdapter extends Adapter {}
    var FixtureAdapter: {
        extend(...mixins: {}[]): FixtureAdapter;
    };
    interface PromiseObject extends Ember.PromiseProxyMixin {}
    interface PromiseArray extends Ember.PromiseProxyMixin {}
}

declare module Ember.RSVP {
    interface Promise {}
    function resolve(value?: any, label?: string): Promise;
    var Promise: {
        all(...promises: Promise[]): Promise;
        all(...any): Promise;
    };
}

declare module Ember {
    interface TsApplicationOptions {
        customEvents?: {};
        rootElement?: string;
        LOG_TRANSITIONS?: boolean;
        LOG_TRANSITIONS_INTERNAL?: boolean;
    }
    interface Application {
        ApplicationAdapter: DS.Adapter;
        Store: DS.Store;
        Router: Ember.Router;
    }
    var Application: {
        create(options?: TsApplicationOptions): Application;
    };
    interface Observable {
        get(key: string): any;
        set(key: string, val: any): Observable;
    }
    interface Route {
        setupController?(controller: Controller, model: any): void;
        model?(params?: any): any;
        store?: DS.Store;
    }
    var Route: {
        extend(...mixins: Route[]): Route;
    };
    interface Router {
        map(mapper: Function): Router;
    }
    interface RouterOptions {
        path: string
    }
    interface RouterDSL {
        resource?(name: string, options?: RouterOptions, callback?: Function): void;
        resource?(name: string, callback: Function): void;
        route?(name: string, options?: RouterOptions): void;
    }
    interface Controller extends Observable {}
    interface ObjectController extends Controller {}
    var ObjectController: {
        extend(...mixins: any[]): ObjectController;
    };
    interface ComputedProperty {
        /**
         * Properties are cacheable by default.
         * Computed property will automatically cache the return value
         * of your function until one of the dependent keys changes.
         * Call volatile() to set it into non-cached mode. When in this mode
         * the computed property will not automatically cache the return value.
         * However, if a property is properly observable, there is no reason to disable caching.
         *
         * @param aFlag optional set to `false` to disable caching
         */
        cacheable(aFlag?: boolean): ComputedProperty;
        /**
         * Access the value of the function backing the computed property. If this property has already been cached,
         * return the cached result. Otherwise, call the function passing the property name as an argument.
         *
         * @param keyName The key being accessed.
         */
        get(keyName: string): any;
        /**
         * Set the value of a computed property. If the function that backs your computed property
         * does not accept arguments then the default action for setting would be to define the property
         * on the current object, and set the value of the property to the value being set.
         *
         * Generally speaking if you intend for your computed property to be set
         * your backing function should accept either two or three arguments.
         *
         * @param keyName The key being accessed.
         * @param newValue The new value being assigned.
         */
        set(keyName: string, newValue: any): any;
    }
    interface computed {
        (func: Function): ComputedProperty;
        /**
         * Creates a new property that is an alias for another property on an object.
         * Calls to get or set this property behave as though they were called on the original property.
         *
         * @param dependentKey
         */
        alias(dependentKey: string): ComputedProperty;
        /**
         * A computed property that performs a logical and on the original values for the provided dependent properties.
         *
         * @param dependentKeys
         */
        and(...dependentKeys: string[]): ComputedProperty;
        /**
         * A computed property that returns the first truthy value from a list of dependent properties.
         *
         * @param dependentKeys
         */
        any(...dependentKeys: string[]): ComputedProperty;
        /**
         * A computed property that converts the provided dependent property into a boolean value.
         *
         * @param dependentKey
         */
        bool(dependentKey: string): ComputedProperty;
        /**
         * A computed property that returns the array of values for the provided dependent properties.
         *
         * @param dependentKeys
         */
        collect(...dependentKeys: string[]): ComputedProperty;
        /**
         * A computed property that acts like a standard getter and setter,
         * but returns the value at the provided defaultPath if the property itself has not been set to a value.
         *
         * @param defaultPath
         */
        defaultTo(defaultPath: string): ComputedProperty;
        /**
         * A computed property that returns true if the value of the dependent property
         * is null, an empty string, empty array, or empty function.
         *
         * Note: When using Ember.computed.empty to watch an array make sure to use
         * the array.[] syntax so the computed can subscribe to transitions from empty to non-empty states.
         *
         * @param dependentKey
         */
        empty(dependentKey: string): ComputedProperty;
        /**
         * A computed property that returns true if the provided dependent property is equal to the given value.
         *
         * @param dependentKey
         * @param value
         */
        equal(dependentKey: string, value: any): ComputedProperty;
        /**
         * Filters the array by the callback.
         *
         * @param dependentKey
         * @param callback
         */
        filter(dependentKey: string, callback: (item: any) => boolean): ComputedProperty;
        /**
         * Filters the array by the property and value.
         *
         * @param dependentKey
         * @param propertyKey
         * @param value
         */
        filterBy(dependentKey: string, propertyKey: string, value: any): ComputedProperty;
        /**
         * @deprecated
         * @param dependentKey
         * @param propertyKey
         * @param value
         */
        filterProperty(dependentKey: string, propertyKey: string, value: any): ComputedProperty;
        /**
         * A computed property that returns true if the provied dependent property is greater than the provided value.
         *
         * @param dependentKey
         * @param value
         */
        gt(dependentKey: string, value: number): ComputedProperty;
        /**
         * A computed property that returns true if the provided dependent property
         * is greater than or equal to the provided value.
         *
         * @param dependentKey
         * @param value
         */
        gte(dependentKey: string, value: number): ComputedProperty;
        /**
         * A computed property which returns a new array with all
         * the duplicated elements from two or more dependent arrays.
         *
         * @param dependentKeys
         */
        intersect(...dependentKeys: string[]): ComputedProperty;
        /**
         * A computed property that returns true if the provided dependent property is less than the provided value.
         *
         * @param dependentKey
         * @param value
         */
        lt(dependentKey: string, value: number): ComputedProperty;
        /**
         * A computed property that returns true if the provided dependent property
         * is less than or equal to the provided value.
         *
         * @param dependentKey
         * @param value
         */
        lte(dependentKey: string, value: number): ComputedProperty;
        /**
         * Returns an array mapped via the callback
         *
         * @param dependentKey
         * @param callback
         */
        map(dependentKey: string, callback: (item: any) => any): ComputedProperty;
        /**
         * Returns an array mapped to the specified key.
         *
         * @param dependentKey
         * @param propertyKey
         */
        mapBy(dependentKey: string, propertyKey: string): ComputedProperty;
        /**
         * @deprecated
         * @param dependentKey
         * @param propertyKey
         */
        mapProperty(dependentKey: string, propertyKey: string): ComputedProperty;
        /**
         * A computed property which matches the original value for the dependent property against a given RegExp,
         * returning true if they values matches the RegExp and false if it does not.
         *
         * @param dependentKey
         * @param regexp
         */
        match(dependentKey: string, regexp: RegExp): ComputedProperty;
        /**
         * A computed property that calculates the maximum value in the dependent array.
         * This will return -Infinity when the dependent array is empty.
         *
         * @param dependentKey
         */
        max(dependentKey: string): ComputedProperty;
        /**
         * A computed property that calculates the minimum value in the dependent array.
         * This will return Infinity when the dependent array is empty.
         *
         * @param dependentKey
         */
        min(dependentKey: string): ComputedProperty;
        /**
         * A computed property that returns true if the value of the dependent property is null or undefined.
         * This avoids errors from JSLint complaining about use of ==, which can be technically confusing.
         *
         * @param dependentKey
         */
        none(dependentKey: string): ComputedProperty;
        /**
         * A computed property that returns the inverse boolean value of the original value for the dependent property.
         *
         * @param dependentKey
         */
        not(dependentKey: string): ComputedProperty;
        /**
         * A computed property that returns true if the value of the dependent property
         * is NOT null, an empty string, empty array, or empty function.
         *
         * Note: When using Ember.computed.notEmpty to watch an array make sure to use
         * the array.[] syntax so the computed can subscribe to transitions from empty to non-empty states.
         *
         * @param dependentKey
         */
        notEmpty(dependentKey: string): ComputedProperty;
        /**
         * Where computed.alias aliases get and set, and allows for bidirectional data flow,
         * computed.oneWay only provides an aliased get. The set will not mutate the upstream property,
         * rather causes the current property to become the value set. This causes the downstream property
         * to permentantly diverge from the upstream property.
         *
         * @param dependentKey
         */
        oneWay(dependentKey: string): ComputedProperty;
        /**
         * A computed property which performs a logical or on the original values for the provided dependent properties.
         *
         * @param dependentKeys
         */
        or(...dependentKeys: string[]): ComputedProperty;
        /**
         * A computed property which returns a new array with all the properties
         * from the first dependent array that are not in the second dependent array.
         *
         * @param setAProperty
         * @param setBProperty
         */
        setDiff(setAProperty: string, setBProperty: string): ComputedProperty;
        /**
         * A computed property which returns a new array with all the properties
         * from the first dependent array sorted based on a property name.
         *
         * @param dependentKey
         * @param propertyName
         */
        sort(dependentKey: string, propertyName: string): ComputedProperty;
        /**
         * A computed property which returns a new array with all the properties
         * from the first dependent array sorted based on a sort function.
         *
         * This function should return -1 when itemA should come before itemB. It should return 1
         * when itemA should come after itemB. If the itemA and itemB are equal this function should return 0.
         *
         * @param dependentKey
         * @param comparator
         */
        sort(dependentKey: string, comparator: (itemA: any, itemB: any) => number): ComputedProperty;
        /**
         * Alias for Ember.computed.uniq. A computed property which returns a new array
         * with all the unique elements from one or more dependent arrays.
         *
         * @param dependentKeys
         */
        union(...dependentKeys: string[]): ComputedProperty;
        /**
         * A computed property which returns a new array with all the unique elements from one or more dependent arrays.
         *
         * @param dependentKeys
         */
        uniq(...dependentKeys: string[]): ComputedProperty;
    }
    /**
     * This helper returns a new property descriptor that wraps the passed computed property function.
     * You can use this helper to define properties with mixins or via Ember.defineProperty().
     *
     * The function you pass will be used to both get and set property values.
     * The function should accept two parameters, key and value.
     * If value is not undefined you should set the value first.
     * In either case return the current value of the property.
     */
    var computed: computed;
    interface PromiseProxyMixin {
        /**
         * An alias to the proxied promise's catch. See RSVP.Promise.catch.
         *
         * @param callback
         */
        catch(callback: Function): RSVP.Promise;
        /**
         * An alias to the proxied promise's finally. See RSVP.Promise.finally.
         *
         * @param callback
         */
        finally(callback: Function): RSVP.Promise;
        /**
         * An alias to the proxied promise's then. See RSVP.Promise.then.
         *
         * @param callback
         */
        then(callback: Function): RSVP.Promise;
        isFullfilled: boolean;
        isPending: boolean;
        isRejected: boolean;
        isSettled: boolean;
        promise: any;
        reason: any;
    }
}