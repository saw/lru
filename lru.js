//a simple LRU cache to store models
var modelCache = function() {
   
   var cache = {};
   
   var meta = [];
   
   //keep the array order by most recently sed
   function sorter(a,b){
      
      if(a.lu < b.lu) {
         return -1;
      }
      if(a.lu > b.lu) {
         return 1;
      }
      
      return 0;
   }

   return {
      set: function(key, value) {
         var index, toPurge, len;
         
         //index is where to find the meta in the array
         index = meta.push({key:key, lu:Date.now()});

         //cache stores a reference to the meta
         cache[key] = {val:value, i:index};
         meta.sort(sorter);
         
         //evict old values
         while(meta.length > 10) {
            toPurge = meta.shift();
            delete cache[toPurge.key];
         }
         
         var len = meta.length;
         
         for (var i=0; i < len; i++) {
            cache[meta[i].key].i = i;
         };

      },
      
      //get function updates the last used time
      get: function(key) {
         if(cache[key]){
            meta[cache[key].i].lu = Date.now();
            return cache[key].val;
         }
      }
   }
   
}();