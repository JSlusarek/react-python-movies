export default function MovieListItem(props) {
    return (
        <div>
            <div>
                <strong>{props.movie.title}</strong>
                {' '}
                <span>({props.movie.year})</span>
                {' '}
                directed by {props.movie.director}
                {' '}
                <button onClick={() => props.onDelete(props.movie)} 
                        style={{ background: "none", border: "none", color: "purple", cursor: "pointer" }}>
                    (Delete)
                </button>
            </div>
            {props.movie.description}
        </div>
    );
}
