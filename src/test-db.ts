import prisma from './db';

async function testDatabase(){
    try{
        console.log('🔍 Probando conexion a la base de datos...');

        // Verificar que podemos acceder a los modelos
        const userCount = await prisma.user.count();
        console.log('✅ Modelo User funciona');

        const postCount = await prisma.post.count();
        console.log('✅ Modelo Post funciona');
        
        const commentCount = await prisma.comment.count();
        console.log('✅ Modelo Comment funciona');
        
        console.log('🎉 ¡Todos los modelos funcionan correctamente!');
    }catch(error){
        console.error('Error: ', error);
    }
}

testDatabase();