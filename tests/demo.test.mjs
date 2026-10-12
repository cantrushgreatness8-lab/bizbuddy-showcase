import {test} from 'node:test';
import assert from 'node:assert/strict';
import {initialState,parsePrice,addProduct,sell,report} from '../src/demo.mjs';
test('decimal input uses exact minor units',()=>{assert.equal(parsePrice('0.10')+parsePrice('0.20'),30);for(const bad of ['-1','1e4','0','1.999'])assert.throws(()=>parsePrice(bad));});
test('sale updates inventory and report together without mutating previous state',()=>{const before=initialState();const after=sell(before,1,2);assert.equal(before.products[0].stock,12);assert.equal(after.products[0].stock,10);assert.deepEqual(report(after),{revenue:24000,transactions:1,units:2,stock:33});});
test('invalid and out-of-stock sales do not change state',()=>{const state=initialState();for(const qty of [0,-1,13,1.5])assert.throws(()=>sell(state,1,qty));assert.equal(state.sales.length,0);});
test('new product participates in sales',()=>{const state=addProduct(initialState(),'Sample bread','25.50',3);assert.equal(sell(state,4).sales[0].total,2550);});
test('product validation bounds names and inventory',()=>{assert.throws(()=>addProduct(initialState(),'','1',1));assert.throws(()=>addProduct(initialState(),'Bread','1',NaN));});
