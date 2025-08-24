// MARK: createTriangleSets
export function createTriangleSets(size) {
    // there will be three sets of layers
    let sets = [];
    
    // MARK: Set 1
    // there will be size - 1 layers in each set
    let layers = [];
    
    let circle = 1;
    
    // go through all layers
    for (let layer = 1; layer < size + 1; layer++) {
        // Each layer will have placeholder numbers of the circles
        let layerCircles = [];
        
        for (let i = 1; i < layer + 1; i++) {
            layerCircles.push(`${circle++}`);
        }
        
        layers.push({
            originalSize: layerCircles.length, // Keep track of size for scoring
            circles: new Set(layerCircles)     // Use Set for easy removal
        });
    }
    sets.push(layers);
    
    // MARK: Set 2
    let setB = [];
    
    // go through the layer from right to left
    for (let i = 0; i < size; i++) {
        let layer = []; // for storing each layer
        
        // go through all layers
        for (let j = 0; j < size; j++) {
            if (!layers[j]) continue
            
            let value = Array.from(layers[j].circles)[i];
            if (value !== undefined) { 
                layer.push(value);
            }
        }
        
        if (layer.length > 0) {
            setB.push({
                originalSize: layer.length,
                circles: new Set(layer)
            });
        }
    }
    
    sets.push(setB);
    
    // MARK: Set 3
    let setC = [];
    
    // go through the layer from left to right
    for (let i = -1; i >= -size; i--) {
        let layer = []; // for storing each layer
        
        // go through all layers
        for (let j = 0; j < size; j++) {
            if (!layers[j]) continue
            
            let n = layers[j].circles.size + i; // negative index
            let value = Array.from(layers[j].circles)[n];
            if (value !== undefined) {
                layer.push(value);
            }
        }
        
        if (layer.length > 0) {
            setC.push({
                originalSize: layer.length,
                circles: new Set(layer)
            });
        }
    }
    
    sets.push(setC);
    
    // Remove layers with only one circle in all sets
    sets = sets.map(set => set.filter(layer => layer.circles.size > 1));
    
    return sets;
}
