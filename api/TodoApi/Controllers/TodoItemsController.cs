using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemsController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodoItemsController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/TodoItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItemDTO>>> GetTodoItems()
        {
            Console.WriteLine($"GetTodoItems  {System.DateTime.Now}");

            return await _context.TodoItems
            .Select(x => ItemToDTO(x))
            .ToListAsync();
        }

        // GET: api/TodoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItemDTO>> GetTodoItem(long id)
        {
            Console.WriteLine($"GetTodoItem {System.DateTime.Now}");
            var todoItem = await _context.TodoItems.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return Ok(ItemToDTO(todoItem));
        }

        [HttpGet("filter/{name}")]
        public async Task<ActionResult<IEnumerable<TodoItemDTO>>> GetTodoItems(string name)
        {
            Console.WriteLine(@$"GetTodoItems {name} {System.DateTime.Now}");
            var todoItems = await _context.TodoItems.Where(x => x.Name.Contains(name, StringComparison.OrdinalIgnoreCase)).ToListAsync();
            if (todoItems is null || todoItems.Count == 0)
            {
                return NotFound();
            }

            return Ok(ItemsToDTOs(todoItems!));
        }

        // PUT: api/TodoItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(long id, TodoItemDTO todoDTO)
        {
            Console.WriteLine($"PutTodoItem  {System.DateTime.Now}");
            if (id != todoDTO.Id)
            {
                return BadRequest();
            }

            var todoItem = await _context.TodoItems.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            todoItem.Name = todoDTO.Name;
            todoItem.IsComplete = todoDTO.IsComplete;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!TodoItemExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }

        //[Route("Range")]
        [HttpPost("Range")]
        public async Task<IActionResult> PostRangeTodoItems(IEnumerable<TodoItemDTO> itemDTOs)
        {
            Console.WriteLine($"Range  {System.DateTime.Now}");
            await _context.TodoItems.AddRangeAsync(itemDTOs.Select(x => DTOToItem(x)));
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // POST: api/TodoItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItemDTO todoDTO)
        {
            Console.WriteLine($"PostTodoItem {System.DateTime.Now}");
            var todoItem = new TodoItem
            {
                IsComplete = todoDTO.IsComplete,
                Name = todoDTO.Name
            };

            _context.TodoItems.Add(todoItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetTodoItem),
                new { id = todoItem.Id },
                ItemToDTO(todoItem));
        }

        [HttpPost("Add")]
        public async Task<ActionResult<TodoItem>> PostTodoItem(int Id, string Name, bool IsComplete)
        {
            Console.WriteLine("PostTodoItem");
            var todoItem = new TodoItem
            {
                Id = Id,
                IsComplete = IsComplete,
                Name = Name
            };

            _context.TodoItems.Add(todoItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetTodoItem),
                new { id = todoItem.Id },
                ItemToDTO(todoItem));
        }
        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(long id)
        {
            Console.WriteLine($"DeleteTodoItem {System.DateTime.Now}");
            var todoItem = await _context.TodoItems.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.TodoItems.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TodoItemExists(long id)
        {
            return _context.TodoItems.Any(e => e.Id == id);
        }

        private static TodoItemDTO ItemToDTO(TodoItem todoItem) =>
       new TodoItemDTO
       {
           Id = todoItem.Id,
           Name = todoItem.Name,
           IsComplete = todoItem.IsComplete
       };

        private static IEnumerable<TodoItemDTO> ItemsToDTOs(IEnumerable<TodoItem> todoItems)
        {
            return todoItems.Select(item => ItemToDTO(item));
        }

        private static TodoItem DTOToItem(TodoItemDTO todoItemDto) =>
       new TodoItem
       {
           Id = todoItemDto.Id,
           Name = todoItemDto.Name,
           IsComplete = todoItemDto.IsComplete
       };
    }
}
