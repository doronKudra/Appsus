import { MailPreview } from "./MailPreview.jsx"

// const { Link } = ReactRouterDOM


export function MailList({ mails }) {
    console.log('mails:', mails)

    if (!mails.length) return <div>No Mails To Show...</div>
    return (
        <React.Fragment>
            <div>Mail list</div>
            <ul className="mail-list">
                {mails.map(mail => 
                    <li className="mail-container" key={mail.id}>
                        <MailPreview mail={mail} />
                    </li>
                )}
            </ul>
        </React.Fragment>
    )
}

// export function CarList({ loadingClass, cars, onRemoveCar }) {


//     return (
//         <ul {...attrs}>
//             {cars.map(car => (
//                 <li className={loadingClass} key={car.id}>
//                     <CarPreview car={car} />
//                     <section>
//                         <button onClick={() => onRemoveCar(car.id)}>
//                             Remove
//                         </button>
//                         <button >
//                             <Link to={`/car/${car.id}`}>Details</Link>
//                         </button>
//                         <button >
//                             <Link to={`/car/edit/${car.id}`}>Edit</Link>
//                         </button>
//                     </section>
//                 </li>
//             ))}
//         </ul>
//     )

// }