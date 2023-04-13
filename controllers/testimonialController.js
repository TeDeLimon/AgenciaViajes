import { Testimonial } from '../models/Testimoniales.js';

const guardarTestimonial = async (req, res) => {

    //Validar
    const { nombre, email, mensaje } = req.body;

    const errores = [];

    if (nombre.trim() === '') {
        errores.push({ mensaje: 'El nombre está vacío' });
    }
    if (email.trim() === '') {
        errores.push({ mensaje: 'El Email está vacío' });
    }
    if (mensaje.trim() === '') {
        errores.push({ mensaje: 'El Mensaje está vacío' });
    }

    if (errores.length) {

        try {

            /*Consultar testimoniales Existentes*/
            const testimoniales = await Testimonial.findAll();

            //Mostrar la vista con errores
            res.render('testimoniales', {
                pagina: 'Testimoniales',
                errores,
                nombre,
                email,
                mensaje,
                testimoniales
            })

        } catch (error) {
            console.log(error);
        }

    }

    //Almacenarlo en la base de datos
    try {

        await Testimonial.create({
            nombre,
            email,
            mensaje
        });

        /*Consultar testimoniales Existentes*/
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            mensajes: 'Muchas gracias por su feedback',
            testimoniales
        })

    } catch (error) {
        console.log(error);
    }

}

export {
    guardarTestimonial
}