
import { useEffect, useRef, useState } from 'react';
import { useDrag, useDragLayer, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import './App.css';

interface BoxProps {
  color: string;
};

interface ItemType {
  color: string
}

function Box(porps: BoxProps) {
  const ref = useRef(null);

  const [{ dragging }, drag, dragPreview] = useDrag({
    type: 'box',
    item: {
      color: porps.color
    },
    collect(monitor) {
      return {
        dragging:monitor.isDragging()
      }
    }
  });

  useEffect(() => {
    drag(ref);
    dragPreview(getEmptyImage());
  }, [])


  return <div ref={ref} className={dragging ? 'box dragging' : 'box'} style={{
    background: porps.color || 'blue'
  }}></div>
};

function Container() {
  const [boxes, setBoxes] = useState<ItemType[]>([])
  const ref = useRef(null);

  const [, drop] = useDrop(() => {
    return {
      accept: 'box',
      drop(item: ItemType) {
        setBoxes((boxes) => [...boxes, item])
      }
    }
  });
  useEffect(() => {
    drop(ref);
  }, []);

  return <div ref={ref} className='container'>
    {
      boxes.map((item, index) => {
        return <Box key={`box_${item.color}_${index}`} color={item.color}></Box>
      })
    }
  </div>
};

function DragLayer() {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset()
  }));

  if (!isDragging) {
    return null
  };

  return (
    <div className='drag-layer' style={{
      left: currentOffset?.x,
      top: currentOffset?.y
    }}>{item.color}拖动ing</div>
  )
};

function App() {
  return (
    <div>
      <Container></Container>
      <Box color='blue'></Box>
      <Box color='red'></Box>
      <Box color='green'></Box>
      <DragLayer></DragLayer>
    </div>
  )
}

export default App
