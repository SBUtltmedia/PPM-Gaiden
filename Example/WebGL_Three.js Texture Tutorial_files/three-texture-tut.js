var camera;
var scene;
var renderer;
var mesh;
var keyboard;


init();
animate();

function init() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = 12;
    camera.position.z = -30;
    
    keyboard = new THREEx.KeyboardState();
    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 1, 1 ).normalize();
    scene.add(light);

    var geometry = new THREE.CubeGeometry( 10, 10, 10); 
            geometry.vertices.push(new THREE.Vector3(50, -50, -50));
        geometry.vertices.push(new THREE.Vector3(50, -50, 50));
        geometry.vertices.push(new THREE.Vector3(-50, -50, 50));
        geometry.vertices.push(new THREE.Vector3(50, 50, -50));
        geometry.vertices.push(new THREE.Vector3(50, 50, 50));
        geometry.vertices.push(new THREE.Vector3(-50, 50, 50));
        geometry.vertices.push(new THREE.Vector3(-50, 50, -50));
    
    var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/rubix_cube2.jpg') } );

var points = [
            // yellow (coordinates are defined counter-clockwise in the pic)
            [
                [0.042, 0.834], //2
                [0.491, 0.982], //0
                [0.952, 0.834], //3
                [0.507, 0.638], //1
            ],

            // red
            [                
                [0.897, 0.308],
                [0.499, 0.039],
                [0.507, 0.638],
                [0.952, 0.834]
            ],

            // // blue  				
            [                
                [0.499, 0.039],
                [0.086, 0.314],
                [0.042, 0.834],
                [0.507, 0.638]

            ]


        ]
   
    geometry.faceVertexUvs[0] = [];
    
    geometry.faceVertexUvs[0][0] = [makeVector2(points[2][2]), makeVector2(points[2][1]), makeVector2(points[2][3])];
    geometry.faceVertexUvs[0][1] = [makeVector2(points[2][1]), makeVector2(points[2][0]), makeVector2(points[2][3])];
    
    geometry.faceVertexUvs[0][2] = [makeVector2(points[1][2]), makeVector2(points[1][1]), makeVector2(points[1][3])];
    geometry.faceVertexUvs[0][3] = [makeVector2(points[1][1]), makeVector2(points[1][0]), makeVector2(points[1][3])];
    
    geometry.faceVertexUvs[0][4] = [makeVector2(points[0][2]), makeVector2(points[0][1]), makeVector2(points[0][3])];
    geometry.faceVertexUvs[0][5] = [makeVector2(points[0][1]), makeVector2(points[0][0]), makeVector2(points[0][3])];
    
    geometry.faceVertexUvs[0][6] = [makeVector2(points[0][2]), makeVector2(points[0][1]), makeVector2(points[0][3])];
    geometry.faceVertexUvs[0][7] = [makeVector2(points[0][1]), makeVector2(points[0][0]), makeVector2(points[0][3])];
    
    geometry.faceVertexUvs[0][8] = [makeVector2(points[1][2]), makeVector2(points[1][1]), makeVector2(points[1][3])];
    geometry.faceVertexUvs[0][9] = [makeVector2(points[1][1]), makeVector2(points[1][0]), makeVector2(points[1][3])];
    
    geometry.faceVertexUvs[0][10] = [makeVector2(points[1][2]), makeVector2(points[1][1]), makeVector2(points[1][3])];
    geometry.faceVertexUvs[0][11] = [makeVector2(points[1][1]), makeVector2(points[1][0]), makeVector2(points[1][3])];

    var tester = findDupFuvs(points);
    console.log(tester);
    var faceInfo = 
    [
        [
            [2, 1, 3],
            [1, 0, 3]
        ],
        
        [
            [2, 1, 3],
            [1, 0, 3]
        ],
        
        [
            [2, 1, 3],
            [1, 0, 3]
        ]

    ];


       
//
//         faceInfo.forEach(function(faceVal, faceIndex) {
//             faceVal.forEach(function(val, index) {
//                 console.log(index, )
//                     // geometry.faceVertexUvs[0][index]= [makeVector2(points[index][faceInfo[index][0]])  ,makeVector2(points[index][faceInfo[index][1]]),makeVector2(points[index][faceInfo[index][2]])    ]
//             })
//
//         })

    

    mesh = new THREE.Mesh(geometry,  material);
    mesh.position.z = -50;
    mesh.position.y = 10;
    
    mesh.rotation.x = 0.2;
    
    mesh.rotation.y = 180;
    scene.add( mesh );
     
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );
        
    render();
}

function makeVector2(points)
{

        return new THREE.Vector2(points[0], points[1]);

}

function findDupFuvs(pntArr)
{
    var dups = [];
//    var temp = -1;
    
    //Creates a new vector2 for every unique ordered pair
    //So, in the end there should be 7 unique vector2s...right?
    //Right.
    for(var i = 0; i < pntArr.length; i++)
    {
       var len2 = pntArr[i].length;
       for(var j = 0; j < len2; j++)
        {
            var temp = makeVector2(pntArr[i][j]);
            if(contains(dups, temp) == false)
            {
                dups.push(temp);
            }
        }
    }
    
    return dups;
}

function contains(arr, obj)
{
    
    for(var i = 0; i < arr.length; i++)
    {
        var comp = new THREE.Vector2(arr[i].x, arr[i].y);
//        console.log(comp);
        if(comp.x == obj.x && comp.y == obj.y)
            return true;
    }
    
    return false;
}


//Translation of UV functions
            
function translateUV(geo, transVec)
{
    fuvs = geo.faceVertexUvs;
    fuvs.forEach(function(val, index, array )
    {
        val.forEach(function(vec, index, array )
        {
            for(var j = 0; j < 3; j++)
            {

                vec[j].x += transVec.x;
                vec[j].y += transVec.y;

                geo.uvsNeedUpdate = true;
            } 

        });
    });

}


function animate() {
//    mesh.rotation.x += .04;
//    mesh.rotation.y += .02;
  
    render();
    
    if(keyboard.pressed("up"))
    {
        translateUV(mesh.geometry, new THREE.Vector2(0, -0.001));    
    }
                
    if(keyboard.pressed("down"))
    {
        translateUV(mesh.geometry, new THREE.Vector2(0, 0.001));    
    }

     if(keyboard.pressed("left"))
    {
        translateUV(mesh.geometry, new THREE.Vector2(0.001, 0));    
    }

     if(keyboard.pressed("right"))
    {
        translateUV(mesh.geometry, new THREE.Vector2(-0.001, 0));    
    }
    
    
    requestAnimationFrame( animate );
}

function render() {
    renderer.render( scene, camera );
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    render();
}
